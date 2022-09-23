const  { VoiceChannel, Client, CommandInteraction} = require("discord.js");
const { createAudioPlayer, createAudioResource, getVoiceConnection  } = require('@discordjs/voice');
const path = require('path');


module.exports = {
    name:"voiceStateUpdate",
    /**
     * @param {VoiceChannel} voiceCh
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    execute(voiceCh, client, interaction) {

        if(interaction)
        return

        //if (!(voiceCh.channel.joinable))
        //return   
        
        const resource = createAudioResource('C:/Users/peeee/Desktop/Taverbot/src/audios/olhaeleae.mp3', {inlineVolume: true});
        resource.volume.setVolume(0.8);
        const player = createAudioPlayer();
        player.play(resource);
        const connection = getVoiceConnection(voiceCh.guild.id);
        if (connection)
        connection.subscribe(player);
        
    }
}