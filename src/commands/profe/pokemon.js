const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'pokemon',
	description: '¡Devuelve informacion de un pokemon!',
	args: true,
    guildOnly: false,
    usage: '<pokemon o id>',
	cooldown: 0,
	aliases: ['poke', 'p'],
	async execute(message, args) {
		let maxPokemonCount = 898;
		if (args[0] > maxPokemonCount) return message.channel.send(`Solo hay ${maxPokemonCount} registrados en la Pokedex.`);
		if (args[1]) return message.channel.send('Wow! Calma, solo tienes que buscar por un solo pokemon o id a la vez.')
		// Convertir en mayuscula la primera letra del string:
		function UpperCaseFirstLetter(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

		const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${args[0]}/`).then(response => response.json()).catch(error => console.log(error));
		const pokemonType = pokemon.types[0].type.name;
		const name = UpperCaseFirstLetter(pokemon.name);
		const thumbnailPng = pokemon.sprites.front_default;
		const emeraldSpritePng = pokemon.sprites.versions['generation-iii'].emerald.front_default;
		const weight = pokemon.weight;
		const height = (pokemon.height * 0.1).toFixed(1);
		const hp = pokemon.stats[0].base_stat;
		const attack = pokemon.stats[1].base_stat
		const defense = pokemon.stats[2].base_stat

		const damageFrom = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}/`).then(response => response.json()).catch(error => console.log(error));

		const doubleDamageFrom = Array.from(damageFrom.damage_relations.double_damage_from);
		let containerDoubleDamageFrom = [];
		doubleDamageFrom.forEach(name => { containerDoubleDamageFrom.push(UpperCaseFirstLetter(name.name)) } );
		containerDoubleDamageFrom = containerDoubleDamageFrom.join('\n');

		const doubleDamageTo = Array.from(damageFrom.damage_relations.double_damage_to);
		let containerDoubleDamageTo = [];
		doubleDamageTo.forEach(name => { containerDoubleDamageTo.push(UpperCaseFirstLetter(name.name)) } );
		containerDoubleDamageTo = containerDoubleDamageTo.join('\n');

		const Embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`Nombre del Pokémon: ${name}`)
		.setThumbnail(thumbnailPng)
		.setAuthor('Pokedex', 'https://simg.nicepng.com/png/small/228-2285786_pokedex-kanto-pokedex-de-kanto.png', '')
		.setDescription(`
**Peso:** ${weight} lbs
**Altura:** ${height}m
**Vida:** ${hp} PS
**Ataque:** ${attack}
**Defensa:** ${defense}
**Habilidades:**`)
		.addFields(
			{ name: 'Tipo:', value: `${UpperCaseFirstLetter(pokemonType)}` },
			{ name: '\u200B', value: '\u200B' },

			{ name: `🩹 ${name} recibe daño doble de:`,
			value: `
			${containerDoubleDamageFrom}
			`, inline: true },

			{ name: `💥 ${name} hace daño doble a:`,
			value: `
			${containerDoubleDamageTo}
			`, inline: true 
			},
		)
		.setImage(emeraldSpritePng)
		.setFooter('Creado por Alonso Pablo https://github.com/Alonso-Pablo', 'https://cdn.vox-cdn.com/thumbor/a7CxWl7Ss6KhGkA3_z94RvJHw2A=/800x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/16125504/jbuffum_190411_gameboy_spot_pokeball_320px.gif');

        message.channel.send(Embed);
	}



		// console.log(`Respuesta dato.abilities: ${dato.abilities}`);
		// console.log(`Respuesta dato.abilities[0]: ${dato.abilities[0]}`);
		// console.log(`Respuesta dato.abilities.ability.name: ${dato.abilities.ability.name}`);
		

	
        // const Embed = new Discord.MessageEmbed()
        // .setColor('#0099ff')
        // .setTitle('Una Imagen/Gif random de gatito:')

        // message.channel.send(Embed);

	
}

/*
async execute(message, args) {
	const getData = async () => {
		try {
			const response = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto/');
			const data = await response.json();
			return data;
		} catch (error) {
			console.log('Fetch Error', error);
		}
	};

		const data = await getData();

		console.log(`Respuesta data: ${data}`); 
		console.log(`Respuesta data.result: ${data.results[0]}`); 
		console.log(`Respuesta data.forms: ${data.abilities[0]}`);
		console.log(`Respuesta data.forms: ${data.abilities[0].ability.name}`);
		
	*/