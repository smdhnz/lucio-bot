const { SlashCommandBuilder } = require('@discordjs/builders');
const search = require('youtube-search');
const {
    createAudioPlayer,
    joinVoiceChannel,
    getVoiceConnection,
} = require('@discordjs/voice');
const q = require('../utils/queue.js');
const p = require('../utils/player.js');
const { apiKey } = require('../config.json');


// build a command
const data = new SlashCommandBuilder()
    .setName('p')
    .setDescription('play music and add queue')
    .addStringOption(option => 
        option.setName('input')
        .setDescription('Enter a song name or url')
        .setRequired(true)
    )

module.exports = {
    data,
    async execute(interaction) {
        // defared processing
        await interaction.deferReply();

        // get input string
        let string = await interaction.options.getString('input')
        // if get url
        if (string.startsWith('http')) {
            const url = new URL(string);
            const params = new URLSearchParams(url.search);
            string = params.get('v');
        }

        // get user voice channel
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.editReply('Join the voice channel');

        // get voice connetion
        let vc = getVoiceConnection(channel.guild.id);
        if (!vc) vc = joinVoiceChannel({
            adapterCreator: channel.guild.voiceAdapterCreator,
            channelId: channel.id,
            guildId: channel.guild.id,
        });

        // youtube search
        const res = await search(string, { maxResults: 1, key: apiKey });
        if (!res) return interaction.editReply('Search error');

        // music data
        var music = res.results[0];

        // reply
        interaction.editReply({
            embeds: [{
                color: 0x00ff7f,
                title: 'Music',
                description: `[${music.title}](${music.link})`,
                thumbnail: {
                    url: music.thumbnails.default.url,
                },
            }]
        });

        // add queue
        await q.push({ title: music.title, id: music.id });

        var queue = await q.queue();
        if (queue.length === 1) {
            // create player
            const player = createAudioPlayer();
            vc.subscribe(player);
            p.playQueue(music, player, p.playQueue);
        }
    },
};

