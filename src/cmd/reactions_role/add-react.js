const { fetchCache, addToCache } = require('../rr')
const messageSchema = require('../load')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    minArgs: 3,
    requiredPermission: ['ADMINISTRATOR'],
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
        const { guild } = message

        if (!guild.me.hasPermission('MANAGE_ROLES')) {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} | The Bot Need \`MANAGE_ROLES\` And \`MANAGE_MESSAGES\` Permission!**`))
            return
        }

        let emoji = args.shift()
        if (!emoji) {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} | Worang Useg\n\nUseg: \`add-react <discord_emoji> <role_mention> <The Message Edit>\`**`))
            return
        }
        let role = args.shift()
        if (!role) {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} | Worang Useg\n\nUseg: \`add-react <discord_emoji> <role_mention> <The Message Edit>\`**`))
            return
        }
        const displayName = args.join(' ')
        if (!displayName) {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} | Worang Useg\n\nUseg: \`add-react <discord_emoji> <role_mention> <The Message Edit>\`**`))
            return
        }

        if (role.startsWith('<@&')) {
            role = role.substring(3, role.length - 1)
        }

        const newRole = guild.roles.cache.find((r) => {
            return r.name === role || r.id === role
        }) || null

        if (!newRole) {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} | I Can't Find \`${role}\` Role!**`))
            return
        }

        role = newRole

        if (emoji.includes(':')) {
            const emojiName = emoji.split(':')[1]
            emoji = guild.emojis.cache.find((e) => {
                return e.name === emojiName
            })
        }

        const [fetchedMessage] = fetchCache(guild.id)
        if (!fetchedMessage) {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setTitle(`**${client.build.emojis.err} | Soory But Do You Make A Reaction Role Message?**`))
            return
        }
        const newLine = `${emoji} ${displayName}`
        let { content } = fetchedMessage
        if (content.includes(emoji)) {
            const split = content.split('\n')

            for (let a = 0; a < split.length; ++a) {
                if (split[a].includes(emoji)) {
                    split[a] = newLine
                }
            }
            content = split.join('\n')
        } else {
            content += `\n${newLine}`
            fetchedMessage.react(emoji)
        }
        fetchedMessage.edit(content)
        const obj = {
            guildId: guild.id,
            channelId: fetchedMessage.channel.id,
            messageId: fetchedMessage.id,
        }
        await messageSchema.findOneAndUpdate(
            obj, {
                ...obj,
                $addToSet: {
                    roles: {
                        emoji,
                        roleId: role.id,
                    },
                },
            }, {
                upsert: true,
            }
        )
        addToCache(guild.id, fetchedMessage, emoji, role.id)
    },
}