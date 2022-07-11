const { MessageEmbed, Permissions } = require("discord.js");
const db = require("../schema/prefix.js");


module.exports = {
    name: "messageCreate",
    run: async (client, message) => {

        if (message.author.bot) return;
        if (!message.guild) return;
        
        let prefix = client.prefix;
        const channel = message?.channel;
        const ress = await db.findOne({ Guild: message.guildId })
        if (ress && ress.Prefix) prefix = ress.Prefix;

        const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(mention)) {
            const embed = new MessageEmbed()
                .setColor(client.embedColor)
            
            .setAuthor({name:`| My prefix here is:  ${prefix}`, iconURL: client.user.displayAvatarURL()});
            message.channel.send({ embeds: [embed] })
        };
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) ||
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;
        if (!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return await message.author.dmChannel.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => { });

        if (!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;

        if (!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return await message.channel.send({ content: `I don't have **\`EMBED_LINKS\`** permission to execute this **\`${command.name}\`** command.` }).catch(() => { });

        const embed = new MessageEmbed()
            .setColor("RED");

  
          
          

        
        if (!channel.permissionsFor(message.guild.me)?.has(Permissions.FLAGS.EMBED_LINKS) && client.user.id !== userId) {
            return channel.send({ content: `Error: I need \`EMBED_LINKS\` permission to work.` });
        }
        if (command.owner && message.author.id !== `${client.owner}`) {
            embed.setDescription("Only developers can use this command!");
            return message.channel.send({ embeds: [embed] });
        }

        



        

        try {
            command.execute(message, args, client, prefix);
        } catch (error) {
            console.log(error);
            embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
            return message.channel.send({ embeds: [embed] });
        }
    }
};