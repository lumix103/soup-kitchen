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
    async execute(msg, args) 
    {
        const kicked = Utils.fetchUserFromMention(msg.client,args[0]);
        let embedColor = parseInt(bot_color);
        let embedReply = new Discord.RichEmbed()
            .setColor(embedColor)
            .setThumbnail(msg.client.user.displayAvatarURL)
            .setTimestamp()
            .setFooter(`~3~`, msg.client.user.displayAvatarURL)
            .setTitle(`Avatar - ${msg.author.tag}`);

        if(!kicked)
        {
            embedReply.setTitle(`${kicked} does not exist ¯\\_(ツ)_/¯`)
                      .setDescription(`This command was called by ${msg.author}`);
            return msg.channel.send(embedReply);
        }
        const guildMember = msg.guild.member(kicked);
        if(!guildMember)
        {
            /*Return with some message that the user is not part of the server. */
            embedReply.setTitle(`${kicked} is not in the server ¯\\_(ツ)_/¯`)
                      .setDescription(`This command was called by ${msg.author}`);
            return msg.channel.send(embedReply);
        }
        if(!guildMember.kickable)
        {
            /*Return with some message that the user is not bannable. */
            embedReply.setTitle(`${guildMember.user.tag} is not kickable.`)
                        .setDescription(`${msg.author} attempted to kick ${kicked}.`);
            return msg.channel.send(embedReply);
        }
        let reason = "Undefined!";
        /*Making sure that args[1] is defined for we can know that they did add a reason. */
        if(args[1])
            reason = args.slice(1,args.length).join(' ');
        let parsedreason = await Utils.parseMentionsToTags(msg.client,reason);
        console.log(`[Kick.JS]>>${parsedreason}`);
        guildMember.kick(`${msg.author.tag} kicked ${guildMember.user.tag} for ${parsedreason}`).then(()=>
        {
            embedReply.setTitle(`Kick Command`)
            .setDescription(`This user was kicked ${kicked} for \"${reason}\"\n
                            Command was called by ${msg.author}`)
            return msg.channel.send(embedReply);
        }).catch(err => 
            {
                embedReply.setDescription(`I could not kick ${kicked}; I may not have the permissions to or they are higher ranked!`)
                        .setTitle(`Could not kick ${kicked} ¯\\_(ツ)_/¯`);
                return msg.channel.send(embedReply);
            });

                    
	},
};