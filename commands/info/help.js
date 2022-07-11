const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  aliases: ["commands", "h"],
  category: "info",
  description: "Get bot commands.",
  owner: false,

  execute: async (message, args, client, prefix) => {
  
 let botlistC =  client.commands.filter((x) => x.category && x.category === "botlist").map((x) => `\`${x.name}\``).join(", ") + "";
      
  
      let infoC =  client.commands.filter((x) => x.category && x.category === "info").map((x) => `\`${x.name}\``).join(", ") + "";
      
   let okok = new MessageEmbed()
   .setTitle(`${client.user.username} Help Panel`)
   .setColor(client.embedColor)
  .setThumbnail(client.user.displayAvatarURL())
  .addField('Information', infoC)
   .addField('Bots List', botlistC)
   message.reply({embeds: [okok]});
  }}