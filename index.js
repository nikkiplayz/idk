const { readdirSync } = require("fs");
const { Client, Intents, Collection, MessageEmbed, MessageButton, MessageSelectMenu } = require("discord.js")
const mongoose = require('mongoose')
const client = new Client({
            shards: "auto",
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
            },
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES, 
                Intents.FLAGS.GUILD_MEMBERS,
            ]
        });

client.config = require('./config.js')
client.commands = new Collection();
client.prefix = client.config.prefix;
client.embedColor = client.config.embedColor;
client.owner = client.config.owner;

const dbOptions = {
        useNewUrlParser: true,
        autoIndex: false,
        connectTimeoutMS: 10000,
        family: 4,
        useUnifiedTopology: true,
      };
        mongoose.connect(client.config.mongodb, dbOptions);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
         console.log('[DB] DATABASE CONNECTED');
              });
        mongoose.connection.on('err', (err) => {
         console.log(`Mongoose connection error: \n ${err.stack}`);
              });
        mongoose.connection.on('disconnected', () => {
         console.log('Mongoose disconnected');
              });



readdirSync("./events/").forEach(file => {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.run(client, ...args));
});


readdirSync("./commands/").forEach(dir => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        
        client.commands.set(command.name, command);
    }
})

process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error))
   
      client.on('ready', () => {
       console.log('✨' + client.user.tag)  
          client.user.setPresence({

   status: 'dnd',

   activity: {

      name: `BW Bots Lab`,

       type: 'WATCHING'

    }

 });
      })
client.login(client.config.token)
