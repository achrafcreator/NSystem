const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "love",
    description: "Test Your love Attributed",
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
        var x = ["100", "8", "10", "99", "93", "82", "62", "71", "38"];

        var x3 = Math.floor(Math.random() * x.length);

        const embed = new MessageEmbed()
            .setColor("#fffff")
            .setTitle(
                `**${message.author.username} Love 💕 ${user.username} With ${x[x3]}%**`
            )
            .setImage(
                "https://cdn.discordapp.com/attachments/756329106953601225/789540715301961738/200_1.gif"
            );
        message.channel.send(embed);
    }
};