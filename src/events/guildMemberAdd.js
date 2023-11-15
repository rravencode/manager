//@ts-check
const { GuildMember } = require("discord.js");
const { guild: { id, role: { abone } } } = require("../config.json");
const croxyDB = require("croxydb");

module.exports = {
    name: "guildMemberAdd",
    type: "on",
    /**
     * 
     * @param {GuildMember} member 
     */
    run: async (member) => {
        if(member.user.bot) return;
        
        const client = member.client;
	try { 
	if(member.guild.id === croxyDB.fetch(`altyapiSunucusu`).guildId) {
         let guild = await client.guilds.fetch(id);
         let guildMember = await guild?.members.fetch(member.id);

         if(guildMember && guildMember.roles.cache.get(abone)) {} else {
             member.ban({ reason: `${!guildMember ? "Raven sunucusundan ayrılmış veya hiç katılmamış." : !guildMember.roles.cache.get(abone) ? "Abone rolü almadan sunucuya giriş yapmış." : "Bu sorguyu bulamadım."}` })
         }
      }
	} catch {
	 member.ban({ reason: `Bilinmeyen üye.` })
	}
       
        
    }
}