const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('quick.db');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
        name: "profile",
        cooldown: 5,
        aliases: ["p"],

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
                let user = message.mentions.users.first() || message.author;
                let XpContent = `${client.profile.get(`${message.guild.id}-${user.id}`, "levelpoints")}`;
                let LevelConent = `${client.profile.get(`${message.guild.id}-${user.id}`, "level")}`
        let bal = db.fetch(`money_${user.id}`)
        const { registerFont } = require('canvas');
        registerFont('data/CairoBold.ttf', { family: 'cairo-bold' });
        const Canvas = createCanvas(512, 512);
        const ctx = Canvas.getContext('2d');
        const profile_img = await loadImage('data/profile.png');
        ctx.drawImage(profile_img, 0, 0, Canvas.width, Canvas.height);
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(0, 0, Canvas.width, Canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = "30px Cairo";
        ctx.fillText(`${user.tag}`, 300, 195);
        ctx.drawImage(profile_img, 0, 0, Canvas.width, Canvas.height);
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(0, 0, Canvas.width, Canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = "30px Cairo";
        ctx.fillText(`Credits: ${bal}`, 300, 255);
        ctx.drawImage(profile_img, 0, 0, Canvas.width, Canvas.height);
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(0, 0, Canvas.width, Canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = "30px Cairo";
        ctx.fillText(`Xp: ${XpContent}`, 300, 315);
        ctx.drawImage(profile_img, 0, 0, Canvas.width, Canvas.height);
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(0, 0, Canvas.width, Canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = "30px Cairo";
        ctx.fillText(`Level: ${LevelConent}`, 300, 380);
        const avatar = await loadImage(user.displayAvatarURL({ format: "png" }))
        ctx.beginPath();
        ctx.arc(155, 245, 60, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.lineTo(avatar, 250, 150)
        ctx.drawImage(avatar, 90, 180);
        const attachment = new MessageAttachment(Canvas.toBuffer(), 'profile.png');
        message.channel.send(attachment);
    }
};
