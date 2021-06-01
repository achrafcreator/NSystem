const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const moment = require("moment")
const chalk = require('chalk');

module.exports = {
    name: "user",
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
        var args = message.content.split(" ").slice(1);
        let user = message.mentions.users.first();
        var men = message.mentions.users.first();
        var heg;
        if (men) {
            heg = men
        } else {
            heg = message.author
        }
        var mentionned = message.mentions.members.first();
        var h;
        if (mentionned) {
            h = mentionned
        } else {
            h = message.member
        }
        moment.locale('ar-TN');
        let id = new MessageEmbed()
            .setColor(client.build.colors.done)
            .addField('**JOINED DISCORD :**', `${moment(heg.createdTimestamp).format('YYYY/M/D')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\``, true)
            .addField('**JOINED SERVER :**', `${moment(h.joinedAt).format('YYYY/M/D')} \n \`${moment(h.joinedAt).fromNow()}\``, true)
            .setThumbnail(heg.avatarURL({
                dynamic: true,
                format: 'png',
                size: 1024
            }));
        message.channel.send(id)
    }
};