const { SlashCommandBuilder } = require('@discordjs/builders');
const q = require('../utils/queue.js');


// build a command
const data = new SlashCommandBuilder()
    .setName('q')
    .setDescription('see queue')

module.exports = {
    data,
    async execute(interaction) {
        // defared processing
        await interaction.deferReply();

        const queue = await q.queue();

        musicListString = '```';
        queue.map((music, index) => {
            musicListString += index + `. ${music.title}` + '\n';
        })
        musicListString += '```';
        interaction.editReply(musicListString);
    },
};

