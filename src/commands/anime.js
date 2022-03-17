const { SlashCommandBuilder } = require('@discordjs/builders');
const { google } = require('googleapis');
const customSearch = google.customsearch('v1');
const { apiKey, cseId } = require('../config.json');
const fetch = require('node-fetch');

const data = new SlashCommandBuilder()
    .setName('anime')
    .setDescription('get ramdom anime character')

module.exports = {
    data,
    async execute(interaction) {
        await interaction.deferReply();

        fetch('https://animechan.vercel.app/api/random')
            .then(response => response.json())
            .then(async (quote) => {
                const result = await customSearch.cse.list({
                    cx: cseId,
                    q: quote.anime + ' ' + quote.character,
                    auth: apiKey,
                    searchType: 'image',
                    num: 1, // max:10
                });
                const url = result.data.items[0].link;
                return { title: quote.anime, name: quote.character, url };
            })
            .then(character => {
                interaction.editReply({ 
                    embeds: [{
                        color: 0x00ff7f,
                        title: character.name,
                        description: character.title,
                        image: {
                            url: character.url,
                        },
                    }],
                })
            })
    },
}
