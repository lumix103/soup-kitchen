const Discord = require('discord.js');
module.exports = 
{
    fetchUserFromMention(client,mention)
    {
        if(!mention || !client)
            return null;
        const mentions = mention.match(/^<@!?(\d+)>$/);
        //First element in mentions will be the mention not the id
        if(!mentions[1])
            return null;
        const id = mentions[1];
        return client.users.get(id);
    },
    async parseMentionsToTags(client,str)
    {
        if(!client || !str)
        {
            return null;
        }
        const mentions = str.match(/<@!?(\d+)>/g);
        if(mentions.length <= 0)
            return null;
        let cpyStr = str;
        for(let i = 0; i < mentions.length; i++)
        {
            const user = await client.fetchUser(mentions[i].match(/(\d+)/g)).then(v => 
                {
                    cpyStr = cpyStr.replace(mentions[i],v.tag);
                    console.log("forEach"+cpyStr);
                }).catch(err =>
                    {
                        console.log(err);
                    });
        }
        console.log(mentions);
        return cpyStr;
    }, 
    makeDefaultEmbed(msg)
    {
        if(!msg)
            return null;
        let embedColor = parseInt(bot_color);
        if(isNaN(embedColor))
            embedColor = 0xff9e49;
        let embedReply = new Discord.RichEmbed()
            .setColor(embedColor)
            .setThumbnail(msg.client.user.displayAvatarURL)
            .setTimestamp()
            .setFooter(`~3~`, msg.client.user.displayAvatarURL);
    } 
}