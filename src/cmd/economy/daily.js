const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');
const chalk = require('chalk');

module.exports = {
    name: "daily",
    cooldown: 5,
    aliases: ["d"],

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
        let timeout = 86400000
        let amount = Math.floor(Math.random() * 1000) + 1;
        let daily = await db.fetch(`daily_${message.author.id}`);
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`${client.build.emojis.err} **| ${message.author.username}, your daily credits refreshes in ${time.hours}h ${time.minutes}m ${time.seconds}s .** `))
        } else {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.warn).setDescription(`${client.build.emojis.done} **| ${message.author.username}, you got :dollar: ${amount} daily credits!**`))
            db.add(`money_${message.author.id}`, amount)
            db.set(`daily_${message.author.id}`, Date.now())
        }
    }
};