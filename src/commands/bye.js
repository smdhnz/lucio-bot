const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');
const fs = require('fs-extra');

const data = new SlashCommandBuilder()
    .setName('bye')
    .setDescription('切断します')

module.exports = {
    data,
    async execute(interaction) {
        const vc = getVoiceConnection(interaction.guild.id);
        if (!vc) return interaction.reply('Bot is not connected to the vc');

        fs.writeJson('./queue.json', {queue: []});

        await interaction.reply('Bye');
        vc.destroy();
    },
};

