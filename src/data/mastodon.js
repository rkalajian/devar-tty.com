const Parser = require('rss-parser');
const parser = new Parser();

let rss_feed = 'https://mastodon.social/users/devartty.rss';

module.exports = async function() {
	return await parser.parseURL(rss_feed);
};