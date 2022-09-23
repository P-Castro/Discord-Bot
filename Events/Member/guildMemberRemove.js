const  { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name:"guildMemberRemove",
    /**
     * @param {GuildMember} member
     */
    execute(member) {
        
        const { user, guild } = member;

        const Loger = new WebhookClient({
            id: "941701265543536660",
            token: "5x58ktHHC3ejO7-K9WFiiI8e0ZhCOCdZ9OZz01Tg9N7qlFWjT0VFsW13G7RLoDlWCEaQ"
        });
        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setAuthor({name:user.tag, iconURL: user.avatarURL({dynamic: true, size: 512})})
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} has left the community\n
        Joined Created: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter({text:`ID: ${user.id}`})

        Loger.send({embeds:[Welcome]})
    }
}