const fs = require('fs-extra');


exports.push = async function (string) {
    const { queue } = await fs.readJson('./queue.json');
    await queue.push(string);
    await fs.writeJson('./queue.json', {queue: queue});
}

exports.pop = async function () {
    const { queue } = await fs.readJson('./queue.json');
    await queue.shift();
    await fs.writeJson('./queue.json', {queue: queue});
    try {
        return queue[0];
    } catch {
        return null;
    }
}

exports.queue = async function () {
    const { queue } = await fs.readJson('./queue.json');
    return queue
}

