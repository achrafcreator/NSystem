const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
let tchannels = [];
const chalk = require('chalk');

module.exports = {
    name: "new",
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
        message.guild.channels.create(`ticket-${message.author.username}`, {
            permissionOverwrites: [{
                    id: message.author.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }
            ],
            type: 'text'
        }).then(c => {
            c.send(new MessageEmbed().setDescription("**White For Admin Response!**").setColor(client.build.colors.warn))
            tchannels.push(c.id);
            message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.done + ` **Your Ticket Has Ben Created! <#${c.id}>**`));
            if (args[1])
                openReason = `\nReason: [ **__${args.slice(1).join(" ")}__** ]`;
        });
    }
};