const fs = require('fs');
const Discord = require('discord.js'); 
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const cooldowns =  new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) 
{
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`Loaded command ${command.name}`);
}


client.once('ready', () => 
{
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Logged in ${client.guilds.size} server(s)`);
});

client.on('message', msg => 
{
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) 
        return;
    /*Checks if the command can not be used in DMS*/
    if (command.guildOnly && msg.channel.type !== 'text') {
        return msg.reply('Stop hitting my DMs for this I got better people on the side for this!');
    }
    /*Checks if the command needs arguments*/
    if(command.args && !args.length)
    {
        let reply = `You didn't pass any arguments to this command.`;
        if(command.usage)
        {
            reply += `\n Was expecting: \'${prefix}${command.name} ${command.usage}\'`;
        }
        return msg.reply(reply);
    }
    /*Checks if the user has the correct permissions */
    if(command.permissions)
    {
        let hasPermissions = false;
        for(let i = 0; i < command.permissions.length; i++)
        {
            console.log(command.permissions[i]);
            if(msg.member.hasPermission(command.permissions[i],true,true))
            {  
                console.log(`${msg.author.tag} has permission: ${command.permissions[i]}`);
                hasPermissions = true;
            }
            else
                hasPermissions = false;
        }
        if(!hasPermissions)
        {
            return msg.reply(`You do not have that permission to execute that command.`)
        }
    }
    /*Checks if there is a cooldown on the command */
    
    if(!cooldowns.has(command.name))
    {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if(timestamps.has(msg.author.id))
    {
        const expirationTIme = timestamps.get(msg.author.id) + cooldownAmount;
        if(now  < expirationTIme)
        {
            const timeLeft = (expirationTIme - now) / 1000;
            return msg.reply(`Please wait ${timeLeft.toFixed(1)} second(s)`);
        }
    }
    else
    {
        timestamps.set(msg.author.id, now);
        setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
    }
    try 
    {
       command.execute(msg, args);
    } catch (err) 
    {
        console.error(err);
        msg.reply('there was an error trying to execute that command!');
    }
});

client.login(token);