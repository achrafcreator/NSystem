const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "kiss",
    description: "Kiss Your Gfrend",
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
            .setDescription(client.build.emojis.warn + " Please mention sameone!")
            .setColor(client.build.colors.warn));
        var x = [
            "https://cdn.discordapp.com/attachments/776819669213642754/789625570262122516/giphy_3.gif",
            "https://cdn.discordapp.com/attachments/776819669213642754/789625570597404682/QcfT_1.gif",
            "https://cdn.discordapp.com/attachments/776819669213642754/789625571217899540/tenor_3.gif",
            "https://cdn.discordapp.com/attachments/776819669213642754/789625571523952700/tenor_2.gif",
            "https://tenor.com/view/kiss-mwuah-baby-gif-10053867"
        ];

        var x3 = Math.floor(Math.random() * x.length);

        const embed = new MessageEmbed()
            .setColor("#fffff")
            .setTitle(`>>> ${message.author.username} kissed 💋 ${user.username}`)
            .setImage(`${x[x3]}`);
        message.channel.send(embed);
    }
};