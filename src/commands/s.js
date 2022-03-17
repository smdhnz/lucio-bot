const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    createAudioPlayer,
    getVoiceConnection,
} = require('@discordjs/voice');
const q = require('../utils/queue.js');
const p = require('../utils/player.js');


// build a command
const data = new SlashCommandBuilder()
    .setName('s')
    .setDescription('skip music')

module.exports = {
    data,
    async execute(interaction) {
        // defared processing
        await interaction.deferReply();

        // get user voice channel
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.editReply('Join the voice channel');

        // get voice connetion
        let vc = getVoiceConnection(channel.guild.id);
        if (!vc) return interaction.reply('Bot is not connected to the vc');

        // reply
        interaction.editReply('Skip');

        // create player
        const player = createAudioPlayer();
        vc.subscribe(player);
        const music = await q.pop();
        if (music) p.playQueue(music, player, p.playQueue);
    },
};

