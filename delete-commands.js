require("dotenv").config();
const { REST, Routes } = require("discord.js");
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Menghapus semua global slash command...");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: [],
    });

    console.log("✅ Semua global command berhasil dihapus!");
  } catch (error) {
    console.error(error);
  }
})();
