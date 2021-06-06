const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'Devuelve una lista de todos los comandos o información de un comando en específico.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
        const data = [];
		const { commands } = message.client;

		if (!args.length) {
            data.push('Aquí tienes una lista de mis comandos:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\n¡Puedes enviar \`${prefix}help [comando]\` para recibir información específica del comando!`);
        
            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('¡Te envie por MD todos mis comandos!');
                })
                .catch(error => {
                    console.error(`No puedo enviarte la ayuda por DM ${message.author.tag}.\n`, error);
                    message.reply('Se ve que no puedo enviarte la lista de comandos por ¿Lo tienes deshabilitados?');
                });
		}

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('¡Ese es un comando invalido!');
        }

        data.push(`**Nombre:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Descripción:** ${command.description}`);
        if (command.usage) data.push(`**Cómo usarlo:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} segundo(s)`);

        message.channel.send(data, { split: true });

	},
};