module.exports = {
    name: 'ping',
    cooldown: 5,
	description: 'Ping!',
	execute(msg, args) {
		msg.channel.send('Pong.');
	},
};