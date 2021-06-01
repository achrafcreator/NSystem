const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "disable-level-system",
    cooldown: 5,
    aliases: ["dls"],

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
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send(new MessageEmbed().setColor("RED").setDescription(client.build.emojis.err + ' You Need `ADMINISTRATOR` To Use This Command!'))
            return;
        }

        let check = client.settings.get(message.guild.id, "levelsystem")
        if (check === false) {
            message.react(client.build.emojis.done)
            client.settings.set(message.guild.id, true, "levelsystem")
        } else if (check === true) {
            message.react(client.build.emojis.err)
            client.settings.set(message.guild.id, false, "levelsystem")
        }
    }
};