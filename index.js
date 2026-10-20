
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;

if (!token || !clientId) {
  throw new Error("Configure DISCORD_TOKEN e DISCORD_CLIENT_ID!");
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Verifica se o bot está online"),

  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Mostra os comandos disponíveis")
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

async function start() {
  await rest.put(
    Routes.applicationCommands(clientId),
    { body: commands }
  );

  await client.login(token);
}

client.once("ready", () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong! Bot funcionando!");
  }

  if (interaction.commandName === "help") {
    await interaction.reply({
      content:
        "**🤖 Comandos disponíveis**\n" +
        "`/ping` — testar o bot\n" +
        "`/help` — mostrar os comandos",
      ephemeral: true
    });
  }
});

start().catch(console.error);
          
