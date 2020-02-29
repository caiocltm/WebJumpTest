const log = require('../logs/logger');

exports.body = (req, callback) => {
	let body = [];
	req
	.on('data', (chunk) => body.push(chunk))
	.on('error', (error) => log.error({
		message: "[bodyParser] Error",
		error
	}))
	.on('end', _ => callback(JSON.parse(body)));
};