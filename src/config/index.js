//@ts-check
const fs = require("fs");

if(!fs.existsSync("src/config.json")) {
    let config = {
        discord: {
            token: "",
            id: ""
        }
    }

    fs.writeFileSync("src/config.json", JSON.stringify(config, null, 2))

    console.log("[CONFIG] ayarlar dosyası oluşturuldu, lütfen ayarları doldurunuz. (src/config.json)")
    process.exit(0)
}

