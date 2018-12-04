const Discord = require("discord.js"),
   
bot = new Discord.Client(),
    BotSettings = require("./botsettings.json")

     //Start-Up
     bot.on("ready", async () => {

        console.log(`\nBot ist online.\nName + Tag: ${bot.user.username}#${bot.user.discriminator}\nPrefix: ${BotSettings.prefix}`)
        bot.user.setStatus("dnd")//online, idle, dnd, invisible
        bot.user.setActivity(`${BotSettings.prefix}help`, {
    
            type: "PLAYING" //PLAYING, STREAMING, LISTENING, WATCHING
        })
        //Name + Avatar
        // bot.user.setUsername("")
        // bot.user.setAvatar("")
        });
    
    bot.on("message", async message => {

        let args = message.content.slice(BotSettings.prefix.length).trim().split(" ")

        //Help
        if(message.content == `${BotSettings.prefix}help`) {
            var helpembed = new Discord.RichEmbed()

            .setTitle(`Alle Befehle`)
            .addField(`Kick`,"Mit diesem Befehl kannst du ein Mitglied kicken, vergiss nur nicht einen Channel mit dem Namen `kick` zu erstellen.")
            .addField(`Ban`,"Mit diesem Befehl kannst du ein Mitglied kicken, vergiss nur nicht einen Channel mit dem Namen `Ban` zu erstellen.")
            .setThumbnail(bot.user.avatarURL)
            .setFooter(`Bot von ${bot.users.get(BotSettings.OwnerID).tag}`)

            message.channel.send(message.author, helpembed)
        }


    //ban
    if(message.content.startsWith(`${BotSettings.prefix}ban`)) {

        if(message.author.id == BotSettings.OwnerID || message.member.hasPermission("BAN_MEMBERS")) {


        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
        if(!bUser) return message.channel.send("Ich kann das Mitglied nicht finden :open_mouth: !");
    
        let bReason = args.join(" ").slice(22);
    
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Du hast nicht die Berechtigung zum bannen. :right_facing_fist:");
        
    
        let banEmbed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor("#FF8300")
        .addField("Gebannter User", `${bUser} mit der ID ${bUser.id}`)
        .addField("Gebannt von", `${message.author} mit der ID ${message.author.id}`)
        .addField("Gebannt in Channel", `${message.channel}`)
        .addField("Zeit", `${message.createdAt}`)
        .addField("Grund", `${bReason}`);
    
        let banChannel = message.guild.channels.find(`name`, "ban");
    
        if(!banChannel) return message.channel.send("Ich habe keinen Channel mit dem Namen `ban` gefunden. :cry:");
        
        message.guild.member(bUser).ban(bReason);
    
        banChannel.send(banEmbed);
        return;
        } 
    }
    
        //kick
        if(message.content.startsWith(`${BotSettings.prefix}kick`)) {

            if(message.author.id == BotSettings.OwnerID || message.member.hasPermission("KICK_MEMBERS")) {


    
    
            let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        
            if(!kUser) return message.channel.send("Ich kann das Mitglied nicht finden :open_mouth: !");
        
            let kReason = args.join(" ").slice(22);
        
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Du hast nicht die Berechtigung zum kicken. :right_facing_fist:");
                
        
            let kickEmbed = new Discord.RichEmbed()
            .setDescription("~Kick~")
            .setColor("#FF8300")
            .addField("Gekickter User", `${kUser} mit der ID ${kUser.id}`)
            .addField("Gekickt von", `${message.author} mit der ID ${message.author.id}`)
            .addField("Gekickt in Channel", message.channel)
            .addField("Zeit", message.createdAt)
            .addField("Grund", kReason);
        
            let kickChannel = message.guild.channels.find(`name`, "kick");
        
            if(!kickChannel) return message.channel.send("Ich habe keinen Channel mit dem Namen ´kick´ gefunden. :cry:");
        
            message.guild.member(kUser).kick(kReason);
        
            kickChannel.send(kickEmbed);
            return;
            }


             if(message.content == `${BotSettings.prefix}würfel`) {
                let random =[`1`,`2`,`3`,`4`,`5`,`6`]
                let chosen = random[Math.floor(Math.random() * random.length)];
                message.channel.send(chosen)
            }

            

        }
    })

bot.login(process.env.BOT_TOKEN)