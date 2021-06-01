const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('quick.db');
const canvacord = require("canvacord");
const chalk = require('chalk');

module.exports = {
        name: "rank",
        cooldown: 5,
        aliases: ["level"],

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
                let user = message.mentions.users.first() || message.guild.members.cache.find(mem => mem.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0])
                if (!user) user = message.author;
                const xpForLevel = level => Math.ceil(level * level * 100);
                const calcLevel = xp => Math.floor(0.1 * Math.sqrt(xp));
                const curLevel = calcLevel(client.profile.get(`${message.guild.id}-${user.id}`, "levelpoints"))
                if (curLevel == undefined || null) curLevel = 3892;
                const pointsNeeded = xpForLevel(curLevel + 1);
                if (pointsNeeded == undefined || null) pointsNeeded = 3892;
                let color;
                const XpContent = `${client.profile.get(`${message.guild.id}-${user.id}`, "levelpoints")}`;
                const LevelConent = `${client.profile.get(`${message.guild.id}-${user.id}`, "level")}`
                if (XpContent == undefined || null) XpContent = 3892;
                if (LevelConent == undefined || null) curLevel = 3892;
                const rank = new canvacord.Rank()
                    .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png' }))
                    .setCurrentXP(Number(XpContent), "#EFFBFB")
                    .setRequiredXP(Number(pointsNeeded), "#585858")
                    .setStatus("idle", true, 7)
                    .renderEmojis(true)
                    .setProgressBar("#2EFEF7")
                    .setRankColor("#EFFBFB")
                    .setLevelColor("#EFFBFB")
                    .setUsername(message.author.username, "#EFFBFB")
                    .setLevel(Number(LevelConent), true)
                    .setDiscriminator(message.author.discriminator, color)
                rank.build()
                    .then(data => {
                        var attachment = new MessageAttachment(data, "RankCard.png");
                    message.channel.send(attachment)
        })
    }
};