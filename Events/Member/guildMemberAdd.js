const  { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name:"guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    execute(member) {
        
        const { user, guild } = member;

        member.roles.add("386904434317197313")
        const Welcomer = new WebhookClient({
            id: "941701265543536660",
            token: "5x58ktHHC3ejO7-K9WFiiI8e0ZhCOCdZ9OZz01Tg9N7qlFWjT0VFsW13G7RLoDlWCEaQ"
        });
        const Welcome = new MessageEmbed()
        .setColor("AGUA")
        .setAuthor({name:user.tag, iconURL: user.avatarURL({dynamic: true, size: 512})})
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome ${member} to the **${guild.name}**!\n
        Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter({text:`ID: ${user.id}`})

        Welcomer.send({embeds:[Welcome]})
    }
}