const axios = require('axios');
const config = require('./config.json')
const Discord = require('discord.js')
const puppeteer = require('puppeteer')
const client = new Discord.Client()

const parseTitle = (body) => {
    let match = body.match(/<title>([^<]*)<\/title>/)
    if (!match || typeof match[1] !== 'string')
        return "No Title"
    return match[1]
}

client.on("ready", async () => {
    console.log("[DISCORD] Bot is log in.")
})

async function scan() {
    var ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
    try {
        axios.get("http://"+ip).then(async resp => {
            if(resp.status == 200) {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto('http://'+ip);
                await page.screenshot({ path: 'screenshot.png' });
                await browser.close();
                axios.get("https://extreme-ip-lookup.com/json/"+ip).then(async iplk => {
                    const file = new Discord.MessageAttachment("screenshot.png");
                    let emb = new Discord.MessageEmbed()
                        .setTitle("Website Found!")
                        .setDescription("**IP:** "+ip+"\n**Host:** "+iplk.data.isp+"\n**City:** "+iplk.data.city+", "+iplk.data.region+" "+iplk.data.countryCode+"\n**Title:** "+parseTitle(resp.data))
                        .setColor("GREEN")
                        .attachFiles(file)
                        .setImage('attachment://screenshot.png')
                    client.channels.cache.get(config.channelid).send(emb)
                })
            }
        }).catch(err => {
            console.log("IP "+ip+" has no website.")
        })
    }catch{

    }

}

setInterval(async () => {
    scan()
}, 10)

client.login(config.token)
