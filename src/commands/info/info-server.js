module.exports = {
	name: 'info-server',
	description: 'Info del server',
        args: false,
        guildOnly: true,
        usage: '',
        cooldown: 0,
        aliases: ['info-sv', 'server-info'],
	execute(message, args) {
        message.channel.send(`

Región: ${message.guild.region}
Nombre del servidor: ${message.guild.name}
Numeros de miembros en ${message.guild.name}: ${message.guild.memberCount}
Fecha de creación: ${message.guild.createdAt}

        `);
	}
    
};