const fetch = require('node-fetch');
const dotenv = require('dotenv');
const Discord = require('discord.js');

dotenv.config();

module.exports = {
	name: 'search',
	description: 'Busca imagenes',
	args: true,
    guildOnly: false,
    usage: '',
	cooldown: 0,
	aliases: [],
	async execute(message, args) {
        const URL = `https://api.unsplash.com/search/photos?client_id=${process.env.PHOTO_API_KEY}&query=${args[0]}`;
		console.log(URL);
		const response = await fetch(`${URL}`).then(response => response.json()).catch(error => console.log(error));

		if(response.total === 0) { return message.channel.send(`No se encontro resultado para: ${args[0]}`); }

        const Embed = new Discord.MessageEmbed()
		.setColor(`${response.results[0].color}`)
		.setTitle(`Resultado de la busqueda:`)
		.setThumbnail(response.results[0].user.profile_image.medium)
		.setDescription(`
**Resultados:** ${response.total} imagenes.
\n\n
**Descripcion:** ${response.results[0].description}.
**Descripcion Alternativa:** ${response.results[0].alt_description}.
\n
**Nombre del fotografo:** ${response.results[0].user.name}
**Localizacion:** ${response.results[0].user.location}.`)
		.setImage(response.results[0].urls.regular)

		message.channel.send(Embed);
	}
};