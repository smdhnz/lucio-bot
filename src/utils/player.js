const ytdl = require('ytdl-core');
const {
    AudioPlayerStatus,
    StreamType,
    createAudioResource,
} = require('@discordjs/voice');
const q = require('../utils/queue.js');


exports.playQueue = async function (music, player, callback) {
    const stream = ytdl(music.id, {filter: 'audioonly'});
    const resource = createAudioResource(stream, {inputType: StreamType.Arbitrary});

    player.play(resource);
    console.log('play start ' + music.title);

    await player.on(AudioPlayerStatus.Idle, async () => {
        const music = await q.pop();
        if (music) await callback(music, player, callback);
    });
}

