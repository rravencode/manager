//@ts-check
const { Client } = require("discord.js");
const { loadCommands, loadEvents } = require("../helpers");

// @ts-ignore
const config = require("../config.json");

module.exports.Bot = class Bot extends Client {
    constructor() {
        super({
            "intents": [
                "Guilds",
                "GuildMembers",
                "GuildMessages",
                "MessageContent"
            ]
        });
    }

    async init() {
        this.login(config.discord["token"]).then(() => {
            console.log("[CLIENT] Discord API'ye istek gönderimi başarılı.")

            loadCommands()
            loadEvents(this)
            
        }).catch((err) => {
             switch (err.code) {
                case "TokenInvalid":
                    console.error("[TOKEN_HATASI] Discord API'ye istek gönderimi başarısız.")
                    break;
                case "DisallowedIntents":
                    console.error("[INTENT_HATASI] Discord botunuz için gerekli intentler karşılanamıyor.")
                    break;
                default:
                    console.error("Bir sebepten dolayı botunuz başlatılamadı.")
                    break;
            }
        })
    }
}