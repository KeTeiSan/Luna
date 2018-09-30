const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./index.json');
const prefix = ("/")

bot.on('ready', function () {
    console.log("Je suis prêt à être utilisé.")
    bot.user.setActivity('/help - v1.0.0').catch(console.error)
});

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur le discord officiel de Argonia.' + member.displayName)
        console.log('${member.displayName} à rejoind le discord')
    }).catch(console.error)
});

bot.login(cfg.token);

bot.on('message', message => { 

    if(message.content === prefix + "help") {
        var help_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("Récapitulatif des commandes disponible :")
        .addField("/help", "Affiche ce même message.")
        .addField("/version", "Affiche la version du bot.")
        .addField("/mod", "Affiche les commandes de modération.")
        .addField("/stats", "Affiche t'es statistiques.")
        .setFooter("© Luna | Argonia.fr")
        message.channel.send(help_embed);
    }

    if(message.content === prefix + "version") {
        var version_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("Informations :")
        .addField("Version du bot :", "1.0.0")
        .addField("Auteur :", "KeTeiSan")
        .addField("Github :", "https://github.com/KeTeiSan/Luna")
        .setFooter("© Luna | Argonia.fr")
        message.channel.send(version_embed);
    }

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) { 

        case "stats":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Statistiques :")
        .addField("ID :", msgauthor, true)
        .addField("Date d'inscription :", userCreateDate[1] + " " + userCreateDate[2] + " " + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Tu peux regarder tes messages privés !")
        message.author.send(stats_embed);

        break;
    }

    if(message.content === prefix + "mod") {
        var mod_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Récapitulatif des commandes de modération :')
        .addField("/kick <@user>", "Kick l'utilisateur mentionné.")
        .addField("/ban <@user>", "Ban l'utilisateur mentionné.")
        .addField("/mute <@user>", "Mute l'utilisateur mentionné.")
        .addField("/unmute <@user>", "Unmute l'utilisateur mentionné.")
        .addField("/clear <nombre>", "Supprime le nombre de messages indiqué.")
        .setFooter("© Luna | Argonia.fr")
        message.channel.send(mod_embed);
    }

    if(message.content.startsWith(prefix + "kick")){
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission!");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisaeur valide")
        }
        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il n'existe pas !")
        }
    
        if(message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour kick");
        }
    
        kick.kick().then(member => {
            message.channel.send(`${member.user.username} vient d'être kick par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la perission");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur valide");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il n'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour ban");
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} vient d'être ban par ${message.author.username} !`)
        });
        
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous n'avez pas la permission !");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Tu dois préciser un nombre de messages à supprimer !")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont été supprimés !`);
        });
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur valide !');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il n'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} vient d'être mute !`);
        });
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur valide !');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il n'existe pas !");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute !`);
        });
    }

});



