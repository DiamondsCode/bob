// index.js

//░░░░░██╗░██████╗░░██████╗░██╗░░░██╗███╗░░██╗████████╗███████╗██████╗░
//░░░░░██║██╔════╝░██╔════╝░██║░░░██║████╗░██║╚══██╔══╝██╔════╝██╔══██╗
//░░░░░██║██║░░██╗░██║░░██╗░██║░░░██║██╔██╗██║░░░██║░░░█████╗░░██████╔╝
//██╗░░██║██║░░╚██╗██║░░╚██╗██║░░░██║██║╚████║░░░██║░░░██╔══╝░░██╔══██╗
//╚█████╔╝╚██████╔╝╚██████╔╝╚██████╔╝██║░╚███║░░░██║░░░███████╗██║░░██║
//░╚════╝░░╚═════╝░░╚═════╝░░╚═════╝░╚═╝░░╚══╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝
const { Client, GatewayIntentBits } = require('discord.js');
let config = require('./config');
let slowmodeConfig = config.slowmodeConfig;

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds
    ]
});

let messageTimestamps = [];

client.on('ready', () => {
    console.log(`BOB: Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.content === config.reloadCommand && !message.author.bot) {
        if (!config.allowedReloadUsers.includes(message.author.id)) {
            message.channel.send('You are not authorized to reload the configuration of bob.');
            console.log(`Unauthorized reload attempt by user ${message.author.id}. What a scumbag!`);
            return;
        }

        try {
            delete require.cache[require.resolve('./config')];
            
            config = require('./config');
            slowmodeConfig = config.slowmodeConfig;
            
            message.channel.send('Bob config reloaded successfully!');
            console.log('Bob config reloaded successfully');
        } catch (error) {
            message.channel.send('Failed to reload Bob config.');
            console.error('Error reloading Bob config:', error);
        }
        return;
    }

    if (message.channel.id === config.channelID && !message.author.bot) {
        const currentTime = Date.now();
        messageTimestamps.push(currentTime);
        messageTimestamps = messageTimestamps.filter(
            (timestamp) => currentTime - timestamp < 60000
        );
        const messagesPerMinute = messageTimestamps.length;
        let slowmodeDuration = 0;
        for (const [mpm, seconds] of Object.entries(slowmodeConfig)) {
            const parsedMpm = parseInt(mpm.replace('mpm', ''));
            if (messagesPerMinute >= parsedMpm) {
                slowmodeDuration = seconds;
            }
        }
        if (message.channel.rateLimitPerUser !== slowmodeDuration) {
            try {
                await message.channel.setRateLimitPerUser(slowmodeDuration);
                console.log(`Updated slowmode to ${slowmodeDuration} seconds.`);
            } catch (error) {
                console.error('Bob failed to update slowmode:', error);
            }
        }
    }
});

client.login(config.botToken);
