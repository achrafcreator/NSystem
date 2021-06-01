const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
        name: "set-welcome",
        cooldown: 5,
        aliases: ["set-welc"],

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
                const channel = message.mentions.channels.first();
                if (!channel) {
                    message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setAuthor(client.build.emojis.err + " | Error").addFields({
                        name: "Please Mention Channel!",
                        value: "`Settings Error`",
                        inline: false
                    }))
                    return;
                }
                const args = message.content.split(" ").slice(2).join(" ");
                if (!args) {
                    message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setAuthor(client.build.emojis.err + " | Error").addFields({
                        name: "Please Type Welcome Message!",
                        value: "`Settings Error`,\n`[NAME] => The Member Username!\n[AGE] => The Member Time Created At!\n[COUNT] => The Members Count In The Server!\n[GNAME] => The Server Name!\n[INVITER] => The Member Inviter!\n[DEFALT] => The Defalt Welcome Message!`",
                        inline: false
                    }))
                    return;
                }
                await db.set(`${message.guild.id}`, {
                    channel: channel,
                    message: args
                })
                message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setAuthor(client.build.emojis.done + " | Done").addFields({
                                name: "The Welcome Channel Has Been Setuped!",
                                value: `Channel: \`${db.get(`${message.guild.id}.channel`).name}\`\n \`Message: ${db.get(`${message.guild.id}.message`)}\``,
                                inline: false
    }))
    }
};