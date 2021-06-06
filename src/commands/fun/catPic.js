const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'cat',
	description: 'Random cat pic',
	args: false,
    guildOnly: false,
    usage: '',
	cooldown: 0,
	aliases: [],
	async execute(message, args) {
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
		
        const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Una Imagen/Gif random de gatito:')
        .setImage(`${file}`);

        message.channel.send(Embed);
	}
};