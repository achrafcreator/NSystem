const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'fruits',
    description: 'Test Your Lock',
    cooldown: 5,
    aliases: [''],

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === 'on')
            return message.channel.send(
                new MessageEmbed()
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.err + ' **You Got Blacklisted!**')
            );
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        let slot1 = ['🍏', '🍇', '🍒', '🍍', '🍅', '🍆', '🍑', '🍓'];
        let slots1 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
        let slots2 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
        let slots3 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
        let we;
        if (slots1 === slots2 && slots2 === slots3) {
            var points = await db.fetch(
                `points_${message.guild.id}_${collected.first().author.id}`
            );
            if (points == null)
                points = db.set(
                    `points_${message.guild.id}_${collected.first().author.id}`, {
                        user: collected.first().author.id,
                        guild: collected.first().author.id,
                        points: 0
                    }
                );
            else {
                db.add(
                    `points_${message.guild.id}_${collected.first().author.id}.points`,
                    3
                );
            }
            we = 'Win!';
        } else {
            we = 'Lose!';
        }
        message.channel.send(`${slots1} | ${slots2} | ${slots3} - ${we}`);
    }
};