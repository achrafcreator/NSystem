const { MessageEmbed } = require('discord.js');
const db = require('quick.db');


var x = [
    "https://cdn.discordapp.com/attachments/798926497490010112/798951739687960646/2021-28-13_06__28__29.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798952044719243304/2021-30-13_06__30__03.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798951871486099516/2021-28-13_06__28__29.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798951510582886420/2021-27-13_06__27__49.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798951367917174874/2021-27-13_06__27__18.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798951194633699359/2021-26-13_06__26__36.png"
];
var x2 = [
    "القاهره",
    "برازيليا",
    "اوتاوا", // اوتاوا ترا عاصمة كندا فا لا حد يجي يقول والله صارق البوت من عن اوتاوا حتا شوف كاتب اسمهم لا اوتاوا هيا عاصمة كندا
    "الرياض",
    "دمشق",
    "القدس"
]

module.exports = {
    name: "capitals",
    description: "Thinking The Capital",
    cooldown: 5,
    aliases: [""],
    time: "10",

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") return message.channel.send(new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"));
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        var x3 = Math.floor(Math.random() * x.length);
        var capitals = new MessageEmbed()
            .setColor(client.build.colors.warn)
            .setImage(`${x[x3]}`, true)
            .setDescription(client.build.emojis.warn + `** You Have ` + module.exports.time + `s To Type The Correct Answer!**`, true);
        message.channel.send(capitals).then(() => {
            var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                max: 1,
                time: module.exports.time * 1000,
                errors: ["time"]
            });
            r.catch(() => {
                return message.channel.send(new MessageEmbed()
                    .setColor(client.build.colors.err)
                    .setTitle(client.build.emojis.warn + " **Time Out!**")
                    .setDescription(`**Time is end and no one type the correct answer**`));
            });

            r.then(async collected => {
                message.channel.send(new MessageEmbed()
                    .setColor(client.build.colors.done)
                    .setDescription(`**${collected.first().author}** Has typed the correct answer ` + client.build.emojis.win))
                let won = collected.first().author;
                var points = await db.fetch(`points_${message.guild.id}_${collected.first().author.id}`);
                if (points == null) points = db.set(`points_${message.guild.id}_${collected.first().author.id}`, {
                    user: collected.first().author.id,
                    guild: collected.first().author.id,
                    points: 0
                })
                else {
                    db.add(`points_${message.guild.id}_${collected.first().author.id}.points`, 1)
                }
            }).catch(err => {
                console.log()
            })
        });
    }
};