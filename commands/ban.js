const Discord = require('discord.js');
const {bot_color} = require('../config.json');
module.exports = {
    name: 'ban',
    args: true,
    guildOnly:true,
    cooldown: 60,
    permissions: ['BAN_MEMBERS'],
    usage: '<mention_user> <reason (optional)>',
	description: 'Bans a user from the server.',
    execute(msg, args) 
    {
        const banned = msg.mentions.users.first();
        let embedColor = parseInt(bot_color);
        let embedReply = new Discord.RichEmbed()
            .setColor(embedColor)
            .setThumbnail(msg.client.user.displayAvatarURL)
            .setTimestamp()
            .setFooter(`~3~`, msg.client.user.displayAvatarURL);
        if(!banned)
        {
            /*Return with some message that the user is not valid */
            embedReply.setTitle(`${banned} does not exist ¯\\_(ツ)_/¯`)
                      .setDescription(`This command was called by ${msg.author}`);
            return msg.channel.send(embedReply);
        }
        const guildMember = msg.guild.member(banned);
        

	},
};