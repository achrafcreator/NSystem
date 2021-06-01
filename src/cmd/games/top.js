const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "top-points",
    description: "See The Leaderboard",
    cooldown: 5,
    aliases: ["games-leaderboard", "games-points", "top-games"],

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") return message.channel.send(new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"));
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        let points = db.fetch(`points_${message.guild.id}`)

        const usersData = []
        message.guild.members.cache.forEach(user => {
            usersData.push(user)
        })

        var pointsContent = usersData.length;
        let usersContent = 0;
        let usersMaxContent = 21;

        let tempData = [];

        for (let i = 0; i < pointsContent; i++) {
            var database = db.fetch(`points_${message.guild.id}_${usersData[i].id}`)
            if (database == null) continue;

            tempData.push({
                name: usersData[i].user.id,
                data: database
            });
        }
        const leaderboardData = []
        tempData.sort((a, b) => b.data - a.data);
        for (let k = 0; k < tempData.length; k++) {
            usersContent++
            if (usersContent >= usersMaxContent) continue;
            leaderboardData.push(`${k+1}# <@!${tempData[k].name}> points: \`${tempData[k].data.points}\``)
        }

        var topValue = leaderboardData.join('\n')

        message.channel.send(
            new MessageEmbed()
            .setAuthor(message.guild.name + ` - Leaderboard!` + client.build.emojis.done, message.guild.iconURL({ dynamic: true }))
            .setColor(client.build.colors.done)
            .setDescription(topValue)
            .setFooter("Requesed By " + message.author.tag)
            .setTimestamp()
        )
    }
};