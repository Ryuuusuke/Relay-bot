const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Say whatever you you said")
    .addStringOption((option) =>
      option
        .setName("messages")
        .setDescription("What you want me to say")
        .setRequired(true),
    ),
  async execute(interaction) {
    const messages = interaction.options.getString("messages");
    await interaction.reply(messages);
  },
};
