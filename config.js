// config.js

//░░░░░██╗░██████╗░░██████╗░██╗░░░██╗███╗░░██╗████████╗███████╗██████╗░
//░░░░░██║██╔════╝░██╔════╝░██║░░░██║████╗░██║╚══██╔══╝██╔════╝██╔══██╗
//░░░░░██║██║░░██╗░██║░░██╗░██║░░░██║██╔██╗██║░░░██║░░░█████╗░░██████╔╝
//██╗░░██║██║░░╚██╗██║░░╚██╗██║░░░██║██║╚████║░░░██║░░░██╔══╝░░██╔══██╗
//╚█████╔╝╚██████╔╝╚██████╔╝╚██████╔╝██║░╚███║░░░██║░░░███████╗██║░░██║
//░╚════╝░░╚═════╝░░╚═════╝░░╚═════╝░╚═╝░░╚══╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝
module.exports = {
    slowmodeConfig: {
        '10mpm': 5,  // 5 seconds slowmode for 10 messages per minute
        '20mpm': 10, // 10 seconds slowmode for 20 messages per minute
        '30mpm': 20, // 20 seconds slowmode for 30 messages per minute
        '40mpm': 30, // 30 seconds slowmode for 40 messages per minute
    },
    channelID: '1268704222761713807', // The ID of the channel to apply slowmode to
    botToken: 'MTI2M####################################8J-dO1ioVA', // Your Discord bot token. Don't share this with anyone!!1!
    reloadCommand: 'bob reload', // CHANGEME: command to reload the bot.
    // CAUTION: When you change the reload command, you can either restart the bot OR run whatever the old reload command was to apply it.
    // EX: I change it from bob reload to bb reload, I would have to run bob reload to then be able to use bb reload.
    allowedReloadUsers: [ // Change to you / your staff members discord IDs.
        '123456789012345678',
        '563168077123026962' // jggunter
    ]
};
