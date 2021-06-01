const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "server",
    cooldown: 5,
    aliases: [""],

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
        const text = message.guild.channels.cache.filter(r => r.type === "text").size
        const voice = message.guild.channels.cache.filter(r => r.type === "voice").size
        const chs = message.guild.channels.cache.size
        const avaibles = message.guild.features.map(features => features.toString()).join("\n")
        const roles = message.guild.roles.cache.size
        const online = message.guild.members.cache.filter(m => m.presence.status === 'online').size
        const idle = message.guild.members.cache.filter(m => m.presence.status === 'idle').size
        const offline = message.guild.members.cache.filter(m => m.presence.status === 'offline').size
        const dnd = message.guild.members.cache.filter(m => m.presence.status === 'dnd').size
        const niro = new MessageEmbed()
            .setAuthor(message.guild.name, message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
            .setColor(client.build.colors.warn)
            .addFields({
                name: `🆔 Server ID`,
                value: `${message.guild.id}`,
                inline: true
            }, {
                name: `📆 Created On`,
                value: message.guild.createdAt.toLocaleString(),
                inline: true
            }, {
                name: `👑 Owner By`,
                value: `${message.guild.owner}`,
                inline: true

            }, {
                name: `👥 Members (${message.guild.memberCount})`,
                value: `**${online}** Online \n **${message.guild.premiumSubscriptionCount}** Boosts ✨`,
                inline: true
            }, {
                name: `💬 Channels (${chs})`,
                value: `**${text}** Text | **${voice}** Voice`,
                inline: true
            }, {
                name: `🌍 Others`,
                value: `**Region:** ${message.guild.region}\n**Verification Level:** ${message.guild.verificationLevel}`,
                inline: true
            }, {
                name: `🔐 Roles (${roles})`,
                value: `To see a list with all roles use #roles`,
                inline: true
            }, )
        message.channel.send(niro)
    }
};