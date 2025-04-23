const { exec } = require("child_process");
require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("node:path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
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
    exec(command, { shell: "/bin/zsh" }, (error, stdout, stderr) => {
      if (error) {
        console.log(`Isi error : ${error}`);
        message.reply(`${error}`);
        return;
      }
      if (stderr) {
        console.log(`Isi stderr : ${stderr}`);
        message.reply(stderr);
      }
      message.reply(stdout);
    });
  }
});
client.login(process.env.DISCORD_TOKEN);
