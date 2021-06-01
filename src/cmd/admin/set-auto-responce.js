const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const fs = require('fs')
const auto = require("./auto.json");
const chalk = require('chalk');

module.exports = {
    name: "set-auto-responce",
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
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + ' You Need `ADMINISTRATOR` To Use This Command!')).then(m => {
            setTimeout(() => {
                m.delete()
            }, 3000);
        })
        let args = message.content.split(" ");
        if (!args[1]) return message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.warn)
            .setDescription(`**Command: set-auto-responce**
                auto respoce.
  
                **Usage:**
                ${prefix}set-auto-responce msg reply

                **Examples:**
                ${prefix}set-auto-responce msg reply
                ${prefix}set-auto-responce hi hello**`)
        )
        if (!args[2]) return message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.warn)
            .setDescription(`**Command: set-auto-responce**
                auto respoce.
  
                **Usage:**
                ${prefix}set-auto-responce msg reply

                **Examples:**
                ${prefix}set-auto-responce msg reply
                ${prefix}set-auto-responce hi hello**`)
        )
        auto[args[1] + message.guild.id] = {
            msg: args[1],
            guild: message.guild.id,
            reply: args[2]
        };
        fs.writeFile("auto.json", JSON.stringify(auto, null, 5), err => {
            console.error(err);
        });
        message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.done)
            .setDescription(`${client.build.colors.done} **Done Sets The Auto Responce**`)
        );
    }
};