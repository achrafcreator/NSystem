const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

const x = [
    "https://i.imgur.com/vyAxtWU.png",
    "https://i.imgur.com/SnMd3qF.png",
    "https://i.imgur.com/uu21eWj.png",
    "https://i.imgur.com/x6Heh9d.png",
    "https://i.imgur.com/Paxy7kT.png",
    "https://i.imgur.com/WcMfGGQ.png",
    "https://i.imgur.com/Vq3ES5f.pn",
    "https://i.imgur.com/X8ocxrr.png",
    "https://i.imgur.com/bpE1YJz.png",
    "https://i.imgur.com/jVR6oao.png",
    "https://i.imgur.com/hS8ggEa.png"
]

const x2 = [
    "95inb",
    "zonwj",
    "ndtf9",
    "qa8uf",
    "5xxmp",
    "r3bm8",
    "748em",
    "fs9md",
    "p98d9",
    "9zx15",
    "sjihf"
]

module.exports = {
    name: "credits",
    cooldown: 5,
    aliases: ["c"],

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
        if (!args[1]) {
            let user = message.mentions.users.first() || message.author;
            let bal = db.fetch(`money_${user.id}`)
            if (bal === null) bal = 5;
            return message.channel.send(
                new MessageEmbed()
                .setColor(client.build.colors.warn)
                .setAuthor(user.tag + " Credits:", user.avatarURL({ dynamic: true }))
                .setDescription(`**💰 | ${user.username} , your account balance is \`\`$${bal}\`\`.**`))
        }
        if (args[1]) {
            let user = message.mentions.members.first()
            let member = db.fetch(`money_${message.author.id}`)
            let userContent = db.fetch(`money_${user.id}`)
            if (userContent === null) userContent = 5;
            if (!user) {
                return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`${client.build.emojis.err} ** | ${message.author.username}, I Cant Find a User**`))
            }
            if (!args[1]) {
                return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`${client.build.emojis.err} ** | ${message.author.username}, type the credit you need to transfer!**`))
            }
            if (message.content.includes('-')) {
                return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`${client.build.emojis.err} ** | ${message.author.username}, Type a Amount \`Not Negative\`**`))
            }
            if (member < args[1]) {
                return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`${client.build.emojis.err} ** | ${message.author.username}, Your balance is not enough for that!**`))
            }
            var pp = args[1];
            var argsContent = Math.floor(pp - (pp * (5 / 100)));
            if (isNaN(args[1])) {
                return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`${client.build.emojis.err} ** | Numbers Only**`))
            }
            var x3 = Math.floor(Math.random() * x.length);
            var captcha = new MessageEmbed()
                .setColor(client.build.colors.warn)
                .setImage(`${x[x3]}`, true)
                .setDescription("**You Have 15s To Confirm The Captcha **" + client.build.emojis.warn);
            message.channel.send(captcha).then(() => {
                var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                    max: 1,
                    time: 15 * 1000,
                    errors: ["time"]
                });
                r.catch(async(bmsg) => {
                    await bmsg.delete(1)
                    message.channel.send(
                        new MessageEmbed()
                        .setDescription(`${client.build.emojis.err} **| Worng Captcha Reading!**`)
                        .setColor(client.build.colors.err)
                    )
                })
                r.then(async(collected) => {
                    await collected.delete(1)
                    message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(`:moneybag: **| ${message.author.username}, has transferred \`$${argsContent}\` to ${user}**`))
                    user.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(`:atm:  |  Transfer Receipt \n\`\`\`You have received $${argsContent} from user ${message.author.username} (ID: ${user.id})\`\`\``)).catch(err => { console.log(err) })
                    db.add(`money_${user.id}`, argsContent)
                    db.subtract(`money_${message.author.id}`, argsContent)
                })
            })
        }
    }
};