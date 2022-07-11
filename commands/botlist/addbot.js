const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
name: "addbot",
 aliases: ["add-bot"],
  category: "botlist",
description: "Add your bot.",
owner: false,
execute: async (message, args, client, prefix) => {
   const addbotC = client.config.addbotChannel;
    const ModRole = client.config.ModRole;
 const logChannel = client.config.logChannel;
    let wrongC = new MessageEmbed()
   .setColor('ff0000') 
    .setTitle('Wrong Channel')
    .setDescription('Opps, You\'re on the wrong channel. Please move to <#' + addbotC + '>.')
if(message.channel.id !== addbotC)
    return message.channel.send({embeds: [wrongC]});
    
   
  let noArgs = new MessageEmbed ()

.setTitle('Please provide a bot user id.')

.setColor('ff0000')

if(!args.join(" "))

    return message.reply({embeds: [noArgs]});
    

 let noBot = new MessageEmbed()

       .setColor('ff0000')

    .setTitle('No bot was found with that id.')
 try{  
  let botU = await client.users.fetch(args.join(" "));
     
   
    if(!botU.bot)
   return message.channel.send({embeds: [noBot]});
     const row = new MessageActionRow()

			.addComponents(

				new MessageButton()
.setURL(`https://discord.com/oauth2/authorize?client_id=${botU.id}&permissions=0&scope=bot%20applications.commands`)					.setStyle('LINK')
            .setLabel('Invite'),

			);
     
 const okyDn = new MessageEmbed()
 .setTitle('Bot Queued:')
 .setColor(client.embedColor)
 .setThumbnail(botU.displayAvatarURL())
 .addField('Bot Tag', `\`${botU.tag}\``)
 .addField('Bot ID',  `\`${botU.id}\``)
 .addField('Owner Tag', `\`${message.author.tag}\``)
 .addField('Owner ID', `\`${message.author.id}\``)
client.channels.cache.get(logChannel).send({content: `<@&${ModRole}>`, embeds: [okyDn], components: [row]})
   message.reply('Bot Successfully Added!')
} 
    catch(error) {

         message.channel.send({embeds: [noBot]});

         }
}}