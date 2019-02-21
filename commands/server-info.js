module.exports = {
    name: 'server-info',
    guildOnly:true,
	description: 'Shows public server info.',
	execute(msg, args) {
		msg.reply(`Soupless was created in ${msg.guild.createdAt}`);
	},
};