const fetch = require('node-fetch');
const dotenv = require('dotenv');
const Discord = require('discord.js');

dotenv.config();

module.exports = {
	name: 'clima',
	description: 'Busca el clima actual de una ciudad.',
	args: true,
    guildOnly: false,
    usage: '<ciudad>',
	cooldown: 0,
	aliases: [],
	async execute(message, args) {
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${args[0]}&lang=es&APPID=${process.env.CLIMA_API_KEY}`;
		console.log(URL);
		const response = await fetch(`${URL}`).then(response => response.json()).catch(error => console.log(error));

		if(response.cod === 401) { return message.channel.send(`No se encontro resultado para la ciudad: ${args[0]}`); }

        
        const Embed = new Discord.MessageEmbed()
		.setColor('#FFFFFF')
		.setTitle(`Resultado de la busqueda: en ${response.name}`)
		.setThumbnail('https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios10-weather-app-icon.png')
		.setDescription(`
**Resultados:**
    ${response.name} ahora mismo esta con ${response.weather[0].description}.
\n\n
**Temperatura:** ${(response.main.temp * 0.1).toFixed(1)} Celsius
**Sensación termica:** ${(response.main.feels_like * 0.1).toFixed(1)} Celsius
\n
**Temperatura Mínima:** ${(response.main.temp_min* 0.1).toFixed(1)} Celsius
**Temperatura Máxima:** ${(response.main.temp_max* 0.1).toFixed(1)} Celsius
**Humedad:** ${response.main.humidity}%
`)

		.setImage(`http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`)
        .setFooter('Creado por Alonso Pablo https://github.com/Alonso-Pablo ; API: openweathermap.org', 'https://2nifty.github.io/github.png');
		message.channel.send(Embed);
	}
};