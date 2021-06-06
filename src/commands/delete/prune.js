module.exports = {
	name: 'prune',
	description: 'Borra n cantidad de mensajes anteriores',
    args: true,
    guildOnly: true,
    usage: '<amount>',
    cooldown: 0,
    aliases: ['delete', 'eliminar', 'trash'],
	execute(message, args) {

        const amount = parseInt(args[0]);

        if (isNaN(amount))
            return message.reply('that doesn\'t seem to be a valid number.');

        if (amount < 2 || amount > 100)
            return message.reply('you need to input a number between 2 and 100.');

        message.channel.bulkDelete(amount, true);
    },
    
};