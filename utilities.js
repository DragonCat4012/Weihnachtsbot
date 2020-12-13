const { Message, MessageEmbed } = require("discord.js");

const colors = {
    error: 0xF91A3C,
    chia: 0x93a7cf,
    shinu: 0x71232d,

    info: 0x93a7cf,
    green: 0x53ba45
}

/**
 * @param {Message} msg 
 * @returns {MessageEmbed} a clean Embed
 */
const rawEmb = (msg) => {
    return new MessageEmbed()
        .setColor(colors.info);
}

const hintEmb = (hint) => {
    return new MessageEmbed()
        .setColor(colors.info)
        .setTimestamp()
        .setDescription(`**Du hast erfolgreich einen Wichtel gefunden!** \n\n || ${hint} ||`)
}

module.exports = { colors, rawEmb, hintEmb };