const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const data = new SlashCommandBuilder()
    .setName('dog')
    .setDescription('random dog image')

module.exports = {
    data,
    async execute(interaction) {
        await interaction.deferReply();
        const res = await axios.get('https://random.dog/woof.json');
        interaction.editReply(res.data.url);
    },
};

