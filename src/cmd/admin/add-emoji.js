const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const db = require('quick.db');
const { parse } = require('twemoji-parser');
const chalk = require('chalk');

module.exports = {
        name: "add-emoji",
        cooldown: 5,
        aliases: [""],

        run: async(client, message) => {
                let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
                if (Blacklist === "on") {
                    message.channel.send(new MessageEmbed()
                        .setColor(client.build.colors.err)
                        .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
                    return;
                }
                var prefix = await db.fetch(`prefix_${message.guild.id}`);
                if (prefix == null) prefix = client.config.bot.setting.main_prefix;
                const args = message.content.split(' ').slice(1)
                if (!message.member.hasPermission('MANAGE_EMOJIS')) {
                    return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **You Need `MANAGE_EMOJIS` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
                }
                const emoji = args.join("");
                if (!emoji) return message.channel.send(
                    new MessageEmbed()
                    .setColor(client.build.colors.err)
                    .setDescription(
                        `**${client.build.emojis.err} Please Type The Emoji!**`
                    )
                );
                let customemoji = Discord.Util.parseEmoji(emoji);
                if (customemoji.id) {
                    const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
            customemoji.animated ? 'gif' : 'png'
        }`;
                    const name = args.slice(1).join(' ');
                    message.guild.emojis.create(`${Link}`, `${name || `${customemoji.name}`}`);

        return message.channel.send(
            new Discord.MessageEmbed()
        .setColor(client.build.colors.warn)
        .setDescription(`**Done Added ${name || `${customemoji.name}`} Emoji In Your Server**`)
        );
    } else {
        let CheckEmoji = parse(emoji, { assetType: 'png' });
        if (!CheckEmoji[0]) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`${client.build.emojis.err} **| Bad Reading**`));
        message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`${client.build.emojis.err} **| Bad Reading**`));
}
    }
};