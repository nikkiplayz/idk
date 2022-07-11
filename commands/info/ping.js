const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  aliases: ["beep", "pong"],
  category: "info",
  description: "Get bot speed!",
  owner: false,

  execute: async (message, args, client, prefix) => {
  message.reply(client.ws.ping + 'ms')
  
  
  }}