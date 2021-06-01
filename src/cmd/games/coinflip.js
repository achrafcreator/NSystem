const { MessageEmbed } = require('discord.js');
const db = require('quick.db');


module.exports = {
    name: "coinflip",
    description: "Flip The Coin And Test Your Lock",
    cooldown: 5,
    aliases: [""],

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") return message.channel.send(new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"));
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        let user = message.mentions.users.first();
        if (!user) return message.channel.send(new MessageEmbed()
            .setDescription(client.build.emojis.warn + "Please mention sameone!")
            .setColor(client.build.emojis.warn));
        var x = [
            "https://cdn.discordapp.com/attachments/776819669213642754/789623814257508382/1608331349170.png",
            "https://cdn.discordapp.com/attachments/776819669213642754/789623814513754122/app_image_big_12515.jpg"
        ];

        var x3 = Math.floor(Math.random() * x.length);

        const embed = new MessageEmbed()
            .setColor("#fffff")
            .setTitle(`>>> ${message.author.username} Fliped The Coin`)
            .setImage(`${x[x3]}`);
        message.channel.send(embed);
    }
};