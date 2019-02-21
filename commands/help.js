const Discord = require('discord.js');
const {prefix,bot_color} = require('../config.json');

module.exports = 
{
    name: 'help',
    description: 'Returns list of commands or their description.',
    aliases: ['commands'],
    usage: '<command_name>',
    cooldown: 5,
    execute(msg,args)
    {
        let embedColor = parseInt(bot_color);
        const data = [];
        const {commands} = msg.client;
        if(!args.length)
        {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
            let embedReply = new Discord.RichEmbed()
                    .setColor(embedColor)
                    .setTitle(`Help Command`)
                    .setThumbnail(msg.client.user.displayAvatarURL)
                    .setDescription(`Command was called by ${msg.author}`)
                    .setTimestamp()
                    .setFooter(`-3-`, msg.client.user.displayAvatarURL);
            commands.map(command => 
            {
                embedReply.addField(`**•** ${command.name}`,`    ${command.description}`);
            })
            return msg.channel.send(embedReply); 
            /*
            return msg.author.send(data, { split: true }).then(() => {
                    if (msg.channel.type === 'dm') return;
                        msg.reply('I\'ve sent you a DM with all my commands!');
                })
            .catch(error => {
                    console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
                    msg.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            });
            */
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) 
        {
            const embedReply = new Discord.RichEmbed()
                .setColor(embedColor)
                .setThumbnail(msg.client.user.displayAvatarURL)
                .setTitle("That's not a valid command...¯\\_(ツ)_/¯")
                .setDescription(`The command you passed isn't a valid command or alias.\n Command was called by ${msg.author}`)
                .setTimestamp()
                .setFooter(`-3-`, msg.client.user.displayAvatarURL);
            return msg.channel.send(embedReply);
        }

        let embedReply = new Discord.RichEmbed()
            .setColor(embedColor)
            .setThumbnail(msg.client.user.displayAvatarURL)
            .setTitle(`Help>>${command.name}`)
            .setTimestamp()
            .setFooter(`-3-`, msg.client.user.displayAvatarURL);
        data.push(`**Name:** ${command.name}`);

        if (command.aliases) 
        {
            data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            embedReply.addField(`Aliases: `, `${command.aliases.join(', ')}`);
        }
        if (command.description)
        { 
            embedReply.setDescription(`${command.description}`);
            data.push(`**Description:** ${command.description}`);
        }
        if (command.usage) 
        {
            embedReply.addField(`Usage: `, `${prefix}${command.name} ${command.usage}`);
            data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        }

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
        embedReply.addField(`Cooldown: `, `${command.cooldown || 3} second(s)`);
        msg.channel.send(embedReply);
        msg.channel.send(data, { split: true });
    }
}