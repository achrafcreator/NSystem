const { Client, Util, MessageEmbed } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
require("dotenv").config();
const notes = "🎶";
const stop = "⏹";
const sos = "🆘";
const skippeded = "⏭️";
const repeating = "🔁";
const resumed = "▶";
const pauseeded = "⏸";
const queue = new Map();
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
        name: "search",
        cooldown: 5,
        aliases: [""],

        run: async(client, message) => {
                const youtube = new YouTube(client.config.bot.connections.yt_api);
                const error = client.build.emojis.err;
                const timeing = client.build.emojis.warn;
                const success = client.build.emojis.done;
                const lodeing = client.build.emojis.done;
                const args = message.content.split(" ");
                const searchString = args.slice(1).join(" ");
                const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
                const serverQueue = queue.get(message.guild.id);
                let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
                if (Blacklist === "on") {
                    message.channel.send(new MessageEmbed()
                        .setColor(client.build.colors.err)
                        .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
                    return;
                }
                var prefix = await db.fetch(`prefix_${message.guild.id}`);
                if (prefix == null) prefix = client.config.bot.setting.main_prefix;
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel)
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "I'm sorry, but you need to be in a voice channel to play a music!"
                        }
                    });
                const permissions = voiceChannel.permissionsFor(message.client.user);
                if (!permissions.has("CONNECT")) {
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "Sorry, but I need a **`CONNECT`** permission to proceed!"
                        }
                    });
                }
                if (!permissions.has("SPEAK")) {
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "Sorry, but I need a **`SPEAK`** permission to proceed!"
                        }
                    });
                }
                if (!url || !searchString)
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "Please input link/title to search music"
                        }
                    });
                if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                    const playlist = await youtube.getPlaylist(url);
                    const videos = await playlist.getVideos();
                    for (const video of Object.values(videos)) {
                        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                        await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
                    }
                    return message.channel.send({
                        embed: {
                            color: "GREEN",
                            description: `${success}  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue`
                        }
                    });
                } else {
                    try {
                        var video = await youtube.getVideo(url);
                    } catch (error) {
                        try {
                            var videos = await youtube.searchVideos(searchString, 10);
                            let index = 0;
                            let embedPlay = new MessageEmbed()
                                .setColor("BLUE")
                                .setAuthor("Search results", message.author.displayAvatarURL())
                                .setDescription(
                                    `${videos
                .map(video2 => `**\`${++index}\`  |**  ${video2.title}`)
                .join("\n")}`
            )
            .setFooter(
              "Please choose one of the following 10 results, this embed will auto-deleted in 15 seconds"
            );
          // eslint-disable-next-line max-depth
          message.channel.send(embedPlay).then(m =>
            m.delete({
              timeout: 15000
            })
          );
          try {
            var response = await message.channel.awaitMessages(
              message2 => message2.content > 0 && message2.content < 11,
              {
                max: 1,
                time: 15000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return message.channel.send({
              embed: {
                color: "RED",
                description:
                  "The song selection time has expired in 15 seconds, the request has been canceled."
              }
            });
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return message.channel.send({
            embed: {
              color: "RED",
              description: `${sos}  **|**  I could not obtain any search results`
            }
          });
        }
      }
      response.delete();
      return handleVideo(video, message, voiceChannel);
    }
    }
};
async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    const song = {
      id: video.id,
      title: Util.escapeMarkdown(video.title),
      url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 100,
        playing: true,
        loop: false
      };
      queue.set(message.guild.id, queueConstruct);
      queueConstruct.songs.push(song);
   
      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(
          `[ERROR] I could not join the voice channel, because: ${error}`
        );
        queue.delete(message.guild.id);
        return message.channel.send({
          embed: {
            color: "RED",
            description: `I could not join the voice channel, because: **\`${error}\`**`
          }
        });
      }
    } else {
      serverQueue.songs.push(song);
      if (playlist) return;
      else
        return message.channel.send({
          embed: {
            color: "GREEN",
            description: `${success}  **|**  **\`${song.title}\`** has been added to the queue`
          }
        });
    }
    return;
  }
   
  function chunk(array, chunkSize) {
    const temp = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      temp.push(array.slice(i, i + chunkSize));
    }
    return temp;
  }
   
  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
   
    if (!song) {
      serverQueue.voiceChannel.leave();
      return queue.delete(guild.id);
    }
   
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        const shiffed = serverQueue.songs.shift();
        if (serverQueue.loop === true) {
          serverQueue.songs.push(shiffed);
        }
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolume(serverQueue.volume / 100);
   
    serverQueue.textChannel.send({
      embed: {
        color: "BLUE",
        description: `${notes}  **|**  Start Playing: **\`${song.title}\`**`
      }
    });
  }
   
  process.on("unhandledRejection", (reason, promise) => {
    try {
      console.error(
        "Unhandled Rejection at: ",
        promise,
        "reason: ",
        reason.stack || reason
      );
    } catch {
      console.error(reason);
    }
  });
   
  process.on("uncaughtException", err => {
    console.error(`Caught exception: ${err}`);
    process.exit(1);
  });