const Discord = require('discord.js');
const {bot_color} = require('../config.json');
module.exports = {
    name: 'prune',
    args: true,
    guildOnly:true,
    aliases: ['clear-messages'],
    cooldown: 120,
    permissions: ['MANAGE_MESSAGES','MANAGE_CHANNELS'],
    usage: '<amount>',
	description: 'Prunes messages in a channel',
    execute(msg, args) 
    {
        let embedColor = parseInt(bot_color);
        const amount = parseInt(args[0]) + 1;

        if(isNaN(amount))
        {
            return msg.reply(`That isn't number make sure you're arguments are correct!`);
        }
        else if(amount <= 1 || amount > 100)
        {
            return msg.reply(`The amount of messages must be within 2 to 100.`);
        }
        msg.channel.bulkDelete(amount,true).catch (err =>
        {
            console.log(err);
            msg.channel.send(`There was an error deleting messages.*NOTE: messages pass two weeks can not be prune.*`)
        });
        
        const embedReply = new Discord.RichEmbed()
        .setColor(embedColor)
        .setTitle(`Prune Command`)
        .setThumbnail(msg.client.user.displayAvatarURL)
        .setDescription(`Cleared messages in ${msg.channel}\n
                        Command was called by ${msg.author}`)
        .setTimestamp()
        .setFooter(`-3-`, msg.client.user.displayAvatarURL);
        msg.channel.send(embedReply);        
	},
};