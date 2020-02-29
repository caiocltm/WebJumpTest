const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

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

exports.formData = (req, callback) => {
	const form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if(err) throw new Error(err);
		let oldpath = files.image.path; // Temporary directory.
		let newpath = path.join(__dirname, '../assets/images/', files.image.name); // Permament directory.
		fs.rename(oldpath, newpath, (err) => {
			if (err) throw new Error(err);
			fields.image = './images/product/' + files.image.name;
			callback(fields);
		});
	});
};
