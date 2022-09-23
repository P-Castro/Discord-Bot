const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message
     */
    execute(message) {
        if(message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📕 A [message](${message.url}) by ${message.author.tag} was **deleted**.\n
        **Deleted Message:**\n ${message.content ? message.content : "None"}`.slice(0, 4096))

        if(message.attachments.size >= 1){
            Log.addField(`attachments`, `${message.attachments.map(a => a.url)}`, true)
        }

        new WebhookClient({url: "https://discord.com/api/webhooks/950377293308645476/9Y977JDaVoseW2gOYeQap9OM-LjGPPqF9AxNG3eZ_PryGTStgdaVlRUQj3VXU1hi99yC"}
        ).send({embeds: [Log]}).catch((err) => { console.log(err)});

    }
}