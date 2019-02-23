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
    } 
}