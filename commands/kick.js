const Discord = require('discord.js');
const {bot_color} = require('../config.json');
const Utils = require('../utils.js');
module.exports = {
    name: 'kick',
    args: true,
    guildOnly:true,
    cooldown: 60,
    permissions: ['KICK_MEMBERS'],
    usage: '<mention_user> <reason (optional)>',
	description: 'Kicks a user from the server.',
    execute(msg, args) 
    {
        const kicked = Utils.fetchUserFromMention(msg.client,args[0]);
        let embedColor = parseInt(bot_color);
        if(kicked)
        {
            if(!msg.guild.member(kicked))
            {
                const embedReply = new Discord.RichEmbed()
                .setColor(embedColor)
                .setTitle(`Kick Command`)
                .setThumbnail(msg.client.user.displayAvatarURL)
                .setDescription(`This user is not in the server. ${kicked}\n
                                Command was called by ${msg.author}`)
                .setTimestamp()
                .setFooter(`-3-`, msg.client.user.displayAvatarURL);
                return msg.channel.send(embedReply);  
            }
            let reason = "";
            if(args[1])
            {
                for(let i = 1; i < args.length;i++)
                {
                    reason += args[i] + " ";
                }
            }
            else
            {
                reason = "Undefined!";
            }
            msg.guild.member(kicked).kick(`User: ${msg.author.tag} Reason: ${reason}`).then(()=>
            {
                const embedReply = new Discord.RichEmbed()
                .setColor(embedColor)
                .setTitle(`Kick Command`)
                .setThumbnail(msg.client.user.displayAvatarURL)
                .setDescription(`This user was kicked ${kicked} for \"${reason}\"\n
                                Command was called by ${msg.author}`)
                .setTimestamp()
                .setFooter(`-3-`, msg.client.user.displayAvatarURL);
                return msg.channel.send(embedReply);
            }).catch(err => 
                {
                    const embedReply = new Discord.RichEmbed()
                    .setColor(embedColor)
                    .setTitle(`Kick Command`)
                    .setThumbnail(msg.client.user.displayAvatarURL)
                    .setDescription(`This user can not be kicked ${kicked}.\n
                                    Command was called by ${msg.author}`)
                    .setTimestamp()
                    .setFooter(`-3-`, msg.client.user.displayAvatarURL);
                    return msg.channel.send(embedReply);
                });
        }
        else   /*This shouldnt happened because you need to pass an argument in order to get this function working */
        {
            return msg.reply(`${kicked} does not exist.`);
        }
	},
};
