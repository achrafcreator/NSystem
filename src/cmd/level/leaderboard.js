const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { util } = require('discord.js-commando')
const chalk = require('chalk');

module.exports = {
    name: "top-levels",
    cooldown: 5,
    aliases: ["levels-leaderboard", "leaderboard", "levels-top", "top-rank"],

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") {
            message.channel.send(new MessageEmbed()
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
            return;
        }
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        if (!args[0]) args[0] = 1

        let page = args[0]
        let thing = 1;
        let data = client.profile.filter(p => p.guild === message.guild.id).array()
        let d = data.sort((a, b) => b.level - a.level)
        const paginated = util.paginate(d, page, Math.floor(10))
        let embed = new MessageEmbed()
            .setTitle(`Level Leaderboard for ${message.guild.name}! 📋`)
            .setColor("GREEN")
            .setDescription(paginated.items.map(user =>

                client.users.cache.get(user.id) ? `${thing++}# ` + `**<@!${client.users.cache.get(user.id).id}>** Level: \`${user.level}\` ` : "Unknown User").join("\n"))
        message.channel.send(embed)
    }
};