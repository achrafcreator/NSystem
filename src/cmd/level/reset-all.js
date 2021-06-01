const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "reset-all",
    cooldown: 5,
    aliases: ["reset-all"],

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

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + ' You Need `ADMINISTRATOR` To Use This Command!')).then(m => {
            setTimeout(() => {
                m.delete()
            }, 3000);
        })
        let toreset = client.profile.filter(p => p.guild === message.guild.id).array()
        toreset.forEach(data => {
            client.profile.delete(`${message.guild.id}-${data.id}`)
        })
        message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(`**${client.build.emojis.done} Done Delete Data From \`${toreset.length}\` user(s).**`))
    }
};