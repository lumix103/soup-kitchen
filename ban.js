const Discord = require('discord.js');
const {bot_color} = require('../config.json');
module.exports = 
{
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
        if(!guildMember)
        {
            /*Return with some message that the user is not part of the server. */
            embedReply.setTitle(`${banned} is not in the server ¯\\_(ツ)_/¯`)
                      .setDescription(`This command was called by ${msg.author}`);
            return msg.channel.send(embedReply);
        }
        if(!guildMember.bannable)
        {
            /*Return with some message that the user is not bannable. */
            embedReply.setTitle(`${guildMember.user.tag} is not bannable.`)
                        .setDescription(`${msg.author} attempted to ban ${banned}.`);
            return msg.channel.send(embedReply);
        }
        let reason = "Undefined!";
        /*Making sure that args[1] is defined for we can know that they did add a reason. */
        if(args[1])
            reason = args.slice(1,args.length).join(' ');
        guildMember.ban(`${msg.author.tag} banned ${guildMember.user.tag} for ${reason}`).then(()=>
        {
            embedReply.setDescription(`${msg.author} banned ${banned} for ${reason}`)
                        .setTitle(`Ban Hammer Has Spoken!`);
            return msg.channel.send(embedReply);
        }).catch(err => 
            {
                embedReply.setDescription(`I could not ban ${banned}; I may not have the permissions to or they are higher ranked!`)
                        .setTitle(`Could not ban ${banned} ¯\\_(ツ)_/¯`);
                return msg.channel.send(embedReply);
            });
	},
};