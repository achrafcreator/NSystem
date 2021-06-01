const { MessageAttachment, MessageEmbed } = require('discord.js');
const { createCanvas, loadImage } = require('canvas')
const db = require('quick.db');

module.exports = {
    name: "drake",
    description: "Ya Na Drake Command",
    cooldown: 5,
    aliases: [""],

    run: async(client, message) => {
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        var args = message.content.split(' ')
        if (!args[1] || !args[2]) return message.channel.send(new MessageEmbed());

        const { registerFont } = require('canvas');
        registerFont('data/CairoBold.ttf', { family: 'cairo-bold' });
        const Canvas = createCanvas(270, 300);
        const ctx = Canvas.getContext('2d');
        const drake_image = await loadImage('data/drake.jpg');
        ctx.drawImage(drake_image, 0, 0, Canvas.width, Canvas.height);
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, Canvas.width, Canvas.height);
        ctx.fillStyle = '#000000';
        ctx.font = "28px Cairo";
        ctx.fillText(`${args[1]}`, Canvas.width / 1.4, Canvas.height / 3.2);

        ctx.fillStyle = '#000000';
        ctx.fillText(`${args[2]}`, Canvas.width / 1.4, Canvas.height / 1.2);
        const attachment = new MessageAttachment(Canvas.toBuffer(), 'drake.jpg');
        message.channel.send(attachment);
    }
};
