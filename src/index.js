// Variables de entorno;
const dotenv = require('dotenv');
dotenv.config();

// Cosas de Discord;
    // fs  es el módulo del sistema de archivos nativo de Node
const fs = require('fs');
const Discord = require("discord.js");
const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// fs.readdirSync devolvera una matriz: ['ping.js', 'beep.js']
// .filter() filtra todos los archivos que sean JS

// Comprueba las carpetasd en busca de comandos pedidos
fs.readdir("./src/commands/", (err, folder) => { //make sure you have a commands folder
    if (err) return console.error(err);

    folder.forEach(folder => {
        fs.readdir(`./src/commands/${folder}`, (err, files) => {
            if (err) return console.error(err);

            files.forEach(file =>{
                if (!file.endsWith(".js")) return; //ignore non js files
                const command = require(`./commands/${folder}/${file}`); 
                // let commandName = file.split(".")[0];
                client.commands.set(command.name, command);
            })
        })

    });
});

client.once('ready', () => {
    //  Channels{ General="848722118447202304", Developing-Bot="848958538042966027" };
    var generalChannel = client.channels.cache.get("848958538042966027");
    generalChannel.send("Funciono! Por ahora...");
    console.log("Connected!");

    client.user.setPresence( {
        status: "online",
        game: {
            name: "en Kanto, investigando.",
            type: "PLAYING"
        }
    } );

});


    // message.author.bot para comprobar si el autor es un bot;
client.on('message', message => {

    console.log(`${message.author.username}: ${message.content}`);

    // fs.appendFile('datosDelChat.txt',`${message.author.username}: ${message.content}\n`,(error)=>{
    //     if(error){ throw error}
    // });

    if (!message.content.startsWith(prefix)) return;
    // Saca el prefijo, Saca los espacios del inicio y final, Separa por espacios, Eliminamos los espacios repetidos;
    const args = message.content.slice(prefix.length).trim().split(/ +/); 
    // Saca la primera palabra del array y todas las letras minusculas;
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Testear comando y argumento
    message.channel.send(`
Comando: ${commandName}\n
Args: ${args}\n
Numero de argumentos: ${args.length}
    `);

    if (!client.commands.has(commandName)) return;

    // const command = client.commands.get(commandName);

    // Si es ejecutado por DM no funcionara, evitando que de error:
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('No funciona por MDs');
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('You can not do this!');
        }
    }

    // Si es necesario argumento y no se proporciono ninguno:
    if (command.args && !args.length) {
        let reply = `${message.author}, no proporcionaste ningún argumento!`;

        if (command.usage) {
            reply += `\nEl uso adecuado sería: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // cooldowns > command > user > timestamp.
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    // Si no se especifica es de 3000ms
    const cooldownAmount = (command.cooldown || 3) * 1000;

    // solo se ejecuta si no ha usado este comando en esta sesión o la espera ya ha expirado.
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    // Cuando pasa el cooldown se elimina la entrada del autor
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply(`Hubo un error ejecutando el comando: ${command}, mensaje: ${message}, argumento: ${args}`);
	}


});




// Login bot, dejarlo abajo de todo;
client.login(process.env.BOT_TOKEN);