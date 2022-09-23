const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const path = require('path');
const fs = require('fs').promises;


module.exports = {
    name: "audio",
    description: "Comando para executar audios gravados",
    options: [
        {
            name: "play",
            description: "toca o audio escolhido.",
            type:"SUB_COMMAND",
            options: [{ name: "query", description: "forneça o nome do audio", type: "STRING", required: true}]
        },
        {
            name: "list",
            description: "Retorna a lista de audios.",
            type:"SUB_COMMAND",
        }

    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel && options.getSubcommand() != "list")
        return interaction.reply({content: "you must be in a voice channel to be able to use the music commands.", ephemeral: true});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `O bot está ja está em outro canal <#${guild.me.voice.channelId}>.`, ephemeral: true});

        try{
            
            switch(options.getSubcommand()) {
                case "play" : {
                    const connection = joinVoiceChannel({ channelId: VoiceChannel.id, guildId: guild.id, adapterCreator: guild.voiceAdapterCreator });
                    const resource = createAudioResource(path.join('C:/Users/peeee/Desktop/Taverbot/src/audios',`${options.getString("query")}.mp3`), {inlineVolume: true});
                    resource.volume.setVolume(0.8);
                    const player = createAudioPlayer();
                    player.play(resource);
                    connection.subscribe(player);
                    return interaction.reply({content: "🎶 Request recieved", ephemeral: true});
                }
                case "list" : {
                    let listAudios = await fs.readdir('C:/Users/peeee/Desktop/Taverbot/src/audios')

                    const Response = new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle('**Áudios**')
                    .setDescription(`**Áudios**:\`${listAudios}\``)
            
                    interaction.reply({embeds: [Response]})
                    //return interaction.reply({content: `🔊 Volume has been set to \`${Volume}%\``});
                }
            }
        }catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ Alert: ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }

    }
}