const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const data = new SlashCommandBuilder()
    .setName('cat')
    .setDescription('random cat image')

module.exports = {
    data,
    async execute(interaction) {
        await interaction.deferReply();
        const res = await axios.get('https://aws.random.cat/meow');
        interaction.editReply(res.data.file.replace('\\', ''));
    },
};

