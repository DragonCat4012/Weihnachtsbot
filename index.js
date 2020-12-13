const Discord = require("discord.js");
const { Client, MessageEmbed, MessageAttachment } = require("discord.js");
const { rawEmb, colors, hintEmb } = require('./utilities')

let config = require('./config.json')
const client = new Client();

let arr = [
    `Hat ein weißes Röckchen an,
    freut sich, dass es fliegen kann.
    Fängst du´s  mit den Händen ein,
    wird es bald geschmolzen sein.`,
    `durch Erhitzen ohne umgebende Flüssigkeit oder in Fett garen + eine essbare Frucht der Art Malus domestica`,
    `Niederschlag in Form von Eiskristallen + erwachsener männlicher Mensch`,
    `Fruchtpunsch, der von innen wärmt`,
    `An welchem Datum ist Weihnachten? (Ohne Jahr)`,
    `Was erhält man an weihnachten?`,
    `Wer kommt am 06.12?`
]

//---------------------------------------------------------------------------------------------------------------
client.on('ready', async() => {
    console.log(`Logged in  as: ${client.user.tag} [${(new Date()).toUTCString().substr(0, 22)}]`)
    client.user.setActivity({ type: 'PLAYING', name: 'Supporting Akora' })
});

client.on('message', async msg => {
    let databaseUser = await client.database.UserCache.getConfig(msg.author.id)
    if (msg.author.bot) return

    if (databaseUser.COUNT == 35) {
        let emb = hintEmb(config.ZWÖLF)
        try { msg.author.send(emb) } catch (er) {}
    } else if (databaseUser.COUNT < 35) {
        databaseUser.COUNT += 1
        await databaseUser.save()
    }
    if (msg.content.toLowerCase() == 'hi') {
        databaseUser.ZWEI = true
        await databaseUser.save()
        let emb = hintEmb(config.ZWEI)
        try { msg.author.send(emb) } catch (er) {}
    }
    if (msg.content.toLowerCase() == 'schneeflocke') {
        databaseUser.VIER = true
        await databaseUser.save()
        let emb = hintEmb(config.VIER)
        try { msg.author.send(emb) } catch (er) {}
    }
    if (msg.content.toLowerCase() == 'bratapfel') {
        databaseUser.FÜNF = true
        await databaseUser.save()
        let emb = hintEmb(config.FÜNF)
        try { msg.author.send(emb) } catch (er) {}
    }
    if (msg.content.toLowerCase() == 'schneemann') {
        databaseUser.SECHS = true
        await databaseUser.save()
        let emb = hintEmb(config.SECHS)
        try { msg.author.send(emb) } catch (er) {}
    }
    if (msg.content.toLowerCase() == 'glühwein') {
        databaseUser.SIEBEN = true
        await databaseUser.save()
        let emb = hintEmb(config.SIEBEN)
        try { msg.author.send(emb) } catch (er) {}
    }
    if (msg.content.toLowerCase() == '24.12') {
        databaseUser.ACHT = true
        await databaseUser.save()
        let emb = hintEmb(config.ACHT)
        try { msg.author.send(emb) } catch (er) {}
    }
    if (msg.content.toLowerCase() == 'geschenke') {
        databaseUser.NEUN = true
        await databaseUser.save()
        let emb = hintEmb(config.NEUN)
        try { msg.author.send(emb) } catch (er) {}
    }
    if (msg.content.toLowerCase() == 'kohlen') {
        databaseUser.ELF = true
        await databaseUser.save()
        let emb = hintEmb(config.ELF)
        try { msg.author.send(emb) } catch (er) {}
    }
    if (msg.content.toLowerCase() == 'nikolaus') {
        databaseUser.ZEHN = true
        await databaseUser.save()
        let emb = hintEmb(config.ZEHN)
        try { msg.author.send(emb) } catch (er) {}
    }

    if (msg.channel.name == 'spam') {
        databaseUser.DREI = true
        await databaseUser.save()
        let emb = hintEmb(config.DREI)
        try { msg.author.send(emb) } catch (er) {}
    }

    let prefixCheck = msg.mentions.members.first()
    if (prefixCheck && prefixCheck.id == client.user.id && !msg.content.startsWith(config.prefix)) {
        msg.channel.send("Mein Prefix ist " + "\`" + config.prefix + "\`")
    }

    if (!msg.content.startsWith(config.prefix)) return
    const args = msg.content.slice((config.prefix).length).split(/ +/);
    const command = args[0]

    if (command == 'show') {
        let text = `**Id: ${databaseUser.user_id}**`

        if (databaseUser.EINS) text += `\n${config.EINS}`
        if (databaseUser.ZWEI) text += `\n${config.ZWEI}`
        if (databaseUser.DREI) text += `\n${config.DREI}`

        if (databaseUser.VIER) text += `\n${config.VIER}`
        if (databaseUser.FÜNF) text += `\n${config.FÜNF}`
        if (databaseUser.SECHS) text += `\n${config.SECHS}`

        if (databaseUser.SIEBEN) text += `\n${config.SIEBEN}`
        if (databaseUser.ACHT) text += `\n${config.ACHT}`
        if (databaseUser.NEUN) text += `\n${config.NEUN}`

        if (databaseUser.ZEHN) text += `\n${config.ZEHN}`
        if (databaseUser.ELF) text += `\n${config.ELF}`
        if (databaseUser.ZWÖLF >= 35) text += `\n${config.ZWÖLF}`

        if (text.length < 30) text += '\nDu scheinst noch keine Wichtel gefunden zu haben'
        let emb = rawEmb(msg).setDescription(text)
        try { msg.author.send(emb) } catch (er) {}
        if (msg.channel.type !== 'dm') msg.channel.send(rawEmb().setDescription('Ich habe dir deine Erfolge per Dm geschickt'))
    }

    if (command == 'test') {
        databaseUser.EINS = true
        await databaseUser.save()
        let emb = hintEmb(config.EINS)
        try { msg.author.send(emb) } catch (er) {}
    }

    if (command == 'hint') {
        var hint = arr[Math.floor(Math.random() * arr.length)];
        let emb = rawEmb().setDescription(hint)
        msg.channel.send(emb)
    }

    if (command == 'help') {
        let emb = rawEmb().setDescription('Heeeeeelp')
        msg.channel.send(emb)
    }
})

const { Local_User, syncDatabase } = require('./database');
const initDatabase = async() => {
    await syncDatabase();

    try {
        for (let entr of(await Local_User.findAll())) client.database.UserCache.set(entr.user_id, entr);
        console.log(" > 🗸 Cached Database Entries");
    } catch (e) {
        console.log(e)
    }
}

const start = async() => {
    try {
        console.log("Logging in...");
        await client.login(config.token).catch();
        await initDatabase();
    } catch (e) {
        console.log(e);
    }
}
start();

module.exports = client
require("./databaseRequest.js")();