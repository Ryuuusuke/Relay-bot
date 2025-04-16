const { exec } = require("child_process");
require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const myself = 672600189059465247;

client.once("ready", () => {
  console.log(`${client.user.tag} is now Active`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const prefix = "~> ";
  if (message.content.startsWith(prefix)) {
    const command = message.content.slice(prefix.length).trim();

    if (message.author.id != myself) {
      message.reply("kamu siapa?");
      return;
    }
    exec(command, (error, stdout, stderr) => {
      if (error) {
        message.reply(error);
        return;
      }
      if (stderr) {
        message.reply(stderr);
      }
      message.reply(stdout);
    });
  }
});
client.login(process.env.DISCORD_TOKEN);
