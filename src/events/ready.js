const fs = require('fs-extra');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        fs.writeJson('./queue.json', {queue: []});
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
