const messageSchema = require('../load')
const { addToCache } = require('../rr')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    minArgs: 1,
    requiredPermissions: ['ADMINISTRATOR'],
    callback: async({ client, message, args }) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") {
            message.channel.send(new MessageEmbed()
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
            return;
        }
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        const { guild, mentions } = message
        const { channels } = mentions
        const targetChannel = channels.first() || message.channel
        if (channels.first()) {
            args.shift()
        }
        const text = args.join(' ')
        if (!text) {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} | Please Type The Message Content!**`))
            return
        }
        const newMessage = await targetChannel.send(text)
        if (!guild.me.hasPermission('MANAGE_ROLES')) {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} | The Bot Need \`MANAGE_ROLES\` And \`MANAGE_MESSAGES\` Permission!**`))
            return
        }
        addToCache(guild.id, newMessage)
        new messageSchema({
            guildId: guild.id,
            channelId: targetChannel.id,
            messageId: newMessage.id,
        }).save().catch(() => {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} | OMG! The Bot Can't Save Data To The DataBase, Dm @ニロ#3892 Ro Fix The Problem**`)).then((message) => {
                message.delete({
                    timeout: 1000 * 10,
                })
            })
        })
    },
}