//@ts-check
const { GuildMember } = require("discord.js");
const { guild: { id, role: { abone } } } = require("../config.json");
const croxyDB = require("croxydb");

module.exports = {
    name: "guildMemberRemove",
    type: "on",
    /**
     * 
     * @param {GuildMember} member 
     */
    run: async (member) => {
        if(member.user.bot) return;
        
        const client = member.client;

        /** Üye altyapı sunucusuna girip Raven'den çıkarsa */
        if(member.guild.id === id) {
         let guild = await client.guilds.fetch(croxyDB.fetch(`altyapiSunucusu`).guildId);
         let guildMember = await guild?.members.fetch(member.id);
            
         if(guildMember) {
            guildMember.ban({ reason: `Raven'den ayrılıp altyapılar sunucusuna girmiş.` })
         }
      }
    }
}