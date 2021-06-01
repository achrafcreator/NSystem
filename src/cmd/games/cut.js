const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

var cuttweet = [
    "كت تويت ‏| تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟",
    "كت تويت | أكثر شيء يُسكِت الطفل برأيك؟",
    "كت تويت | الحرية لـ ... ؟",
    "كت تويت | قناة الكرتون المفضلة في طفولتك؟",
    "كت تويت ‏| كلمة للصُداع؟",
    "كت تويت ‏| ما الشيء الذي يُفارقك؟",
    "كت تويت | موقف مميز فعلته مع شخص ولا يزال يذكره لك؟",
    "كت تويت ‏| أيهما ينتصر، الكبرياء أم الحب؟",
    "كت تويت | بعد ١٠ سنين ايش بتكون ؟",
    "كت تويت ‏| مِن أغرب وأجمل الأسماء التي مرت عليك؟",
    "‏كت تويت | عمرك شلت مصيبة عن شخص برغبتك ؟",
    "كت تويت | أكثر سؤال وجِّه إليك مؤخرًا؟",
    "‏كت تويت | ما هو الشيء الذي يجعلك تشعر بالخوف؟",
    "‏كت تويت | وش يفسد الصداقة؟",
    "‏كت تويت | شخص لاترفض له طلبا ؟",
    "‏كت تويت | كم مره خسرت شخص تحبه؟.",
    "‏كت تويت | كيف تتعامل مع الاشخاص السلبيين ؟",
    "‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟",
    "‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!",
    "‏كت تويت |أقوى كذبة مشت عليك ؟",
    "‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟",
    "كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟",
    "‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟",
    "‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟",
    "‏كت تويت | وش محتاج عشان تكون مبسوط ؟",
    "‏كت تويت | مطلبك الوحيد الحين ؟",
    "‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟"
];

module.exports = {
    name: "cut",
    description: "The Daily Questions",
    cooldown: 5,
    aliases: [""],

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") return message.channel.send(new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"));
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        var cut = new MessageEmbed()
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .addField("كت تويت", `${cuttweet[Math.floor(Math.random() * cuttweet.length)]}`)
            .setColor(client.build.colors.done)

        message.channel.send(cut).catch(err => {
            console.log()
        })
    }
};