const Discord = require('discord.js');

module.exports = {
	name: 'charmander',
    description: 'Charmander Info',
	args: false,
    guildOnly: false,
    usage: '',
	cooldown: 5,
    permissions: '',
    aliases: ['test'],
	execute(message, args) {
        // inside a command, event listener, etc.
        const Embed = new Discord.MessageEmbed()
            .setColor('#E67E22')
            .setTitle('Charmander')
            .setURL('https://pokemon.gameinfo.io/es/pokemon/4-charmander')
            .setAuthor('Pokedex', 'https://simg.nicepng.com/png/small/228-2285786_pokedex-kanto-pokedex-de-kanto.png', '')
            .setDescription('Unos de los 3 pokemones a elegir antes de empezar la aventura.')
            .setThumbnail('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png')
            .addFields(
                { name: 'Tipo:', value: '🔥 Fuego' },
                { name: '\u200B', value: '\u200B' },

                { name: '❌ Debil a:',
                value: `
                🌎 Tierra,
                🌑 Roca
                🌊 Agua`, inline: true },

                { name: '✔ Resistente a:',
                value: `
                ❄ Hielo,
                🔥 Fuego,
                🌱 Planta,
                🦾 Acero,
                🐛 Bicho,
                🦋 Hada`, inline: true 
                },
            )
            .addField('Mejor set de movimeintos:', 'Ataque: Ascuas y Lanzallamas; Defensa: Ascuas y Nitrocarga', false)
            // .setImage('https://www.pkparaiso.com/imagenes/espada_escudo/sprites/animados-gigante/charmander.gif')
            .setImage('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png')
            .setTimestamp()
            .setFooter('Creado por Sidoku', 'https://cdn.vox-cdn.com/thumbor/a7CxWl7Ss6KhGkA3_z94RvJHw2A=/800x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/16125504/jbuffum_190411_gameboy_spot_pokeball_320px.gif');
        
        message.channel.send(Embed);


	},
};