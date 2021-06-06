module.exports = {
	name: 'ping',
	description: 'Ping!Pong!',
	args: false,
    guildOnly: false,
    usage: '',
	cooldown: 0,
	aliases: [],
	execute(message, args) {
		message.channel.send('Pong!');
	
		message.channel.send(":ping_pong: Pong!")
		.then(m => {
			m.edit(`:incoming_envelope: Ping Mensajes: \`${(Math.floor(m.createdTimestamp - Date.now()) * -1)} ms\``);

		});
	}
};