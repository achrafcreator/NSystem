const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "hack",
    description: "Hack Your Frends",
    cooldown: 5,
    aliases: [""],

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") return message.channel.send(new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"));
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        message.delete();

        let virusname = args.join(" ");
        if (virusname < 1) {
            return message.channel.send(new MessageEmbed()
                .setDescription(client.build.emojis.warn + " Please mention sameone!")
                .setColor(client.build.colors.warn));
        }
        message.channel
            .send({
                embed: new MessageEmbed()
                    .setDescription("Loading " + virusname + "...")
                    .setColor(0xff0000)
            })
            .then(function(m) {
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription("[" + virusname + "]: Loading Discord Virus [▓ ] 1%")
                            .setColor(0xff0000)
                    });
                }, 1000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription("[" + virusname + "]: Loading Discord Virus [▓▓ ] 2%")
                            .setColor(0xff0000)
                    });
                }, 2000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription("[" + virusname + "]: Loading Discord Virus [▓▓▓ ] 3%")
                            .setColor(0xff0000)
                    });
                }, 3000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription("[" + virusname + "]: Loading Discord Virus [▓▓▓▓ ] 4%")
                            .setColor(0xff0000)
                    });
                }, 4000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" + virusname + "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓ ] 20%"
                            )
                            .setColor(0xff0000)
                    });
                }, 5000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 30%"
                            )
                            .setColor(0xff0000)
                    });
                }, 6000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 40%"
                            )
                            .setColor(0xff0000)
                    });
                }, 7000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 50%"
                            )
                            .setColor(0xff0000)
                    });
                }, 8000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 70%"
                            )
                            .setColor(0xff0000)
                    });
                }, 9000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 85%"
                            )
                            .setColor(0xff0000)
                    });
                }, 10000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 90%"
                            )
                            .setColor(0xff0000)
                    });
                }, 11000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 95%"
                            )
                            .setColor(0xff0000)
                    });
                }, 12000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 96%"
                            )
                            .setColor(0xff0000)
                    });
                }, 13000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 97%"
                            )
                            .setColor(0xff0000)
                    });
                }, 14000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 98%"
                            )
                            .setColor(0xff0000)
                    });
                }, 15000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 99%"
                            )
                            .setColor(0xff0000)
                    });
                }, 16000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%"
                            )
                            .setColor(0xff0000)
                    });
                }, 17000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]:" +
                                virusname +
                                "done it's going good 100.9%"
                            )
                            .setColor(0xff0000)
                    });
                }, 18000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription("[" + virusname + "]: يتم تهكير ")
                            .setColor(0xff0000)
                    });
                }, 19000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription("[" + virusname + "]: تحديث بسيط" + virusname + ".key")
                            .setColor(0xff0000)
                    });
                }, 22000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription("[" + virusname + "]: يرجى انتضار ثواني 5...")
                            .setColor(0xff0000)
                    });
                }, 25000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription("[" + virusname + "]: يرجى انتضار ثواني 4...")
                            .setColor(0xff0000)
                    });
                }, 26000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription("[" + virusname + "]: يرجى انتضار ثواني 3...")
                            .setColor(0xff0000)
                    });
                }, 27000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription("[" + virusname + "]: يرجى انتضار ثواني 2...")
                            .setColor(0xff0000)
                    });
                }, 28000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription("[" + virusname + "]: يرجى انتضار ثواني 1...")
                            .setColor(0xff0000)
                    });
                }, 29000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 99%"
                            )
                            .setColor(0xff0000)
                    });
                }, 30000);
                setTimeout(function() {
                    m.edit({
                        embed: new MessageEmbed()
                            .setDescription(
                                "[" +
                                virusname +
                                "]: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]100% virus added"
                            )
                            .setColor(0xff0000)
                    });
                }, 31000);
                setTimeout(function() {
                    m.delete();
                }, 32000);
                setTimeout(function() {
                    message.channel.send("**This user has ben hacked😂😆**");
                }, 33000);
            });
    }
};