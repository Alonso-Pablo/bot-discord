module.exports = {
	name: 'info-me',
	description: 'Info de uno mismo',
    args: false,
    guildOnly: false,
    usage: '',
    cooldown: 0,
    aliases: ['infome', 'my-info','about-me'],
	execute(message, args) {
		message.channel.send(`
Tu nombre de usuario: ${message.author.username}
Tu ID: ${message.author.id}
Tu Nickname: ${message.author.nickname}
Estado: ${message.author.presence.status}
Cuenta creada: ${message.author.createdAt.toDateString()}
Avatar: ${message.author.displayAvatarURL()}
        `)
    },
};