const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "hug",
    description: "Hug Your Best Frend",
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
            "https://cdn.discordapp.com/attachments/756329106953601225/789469547023433758/200.gif",
            "https://cdn.discordapp.com/attachments/756329106953601225/789469547395940352/tenor.gif",
            "https://cdn.discordapp.com/attachments/756329106953601225/789469975327932416/tenor_1.gif"
        ];

        var x3 = Math.floor(Math.random() * x.length);

        const embed = new MessageEmbed()
            .setColor("#fffff")
            .setTitle(`>>> ${message.author.username} hug 🤗️ ${user.username}`)
            .setImage(`${x[x3]}`);
        message.channel.send(embed);
    }
};