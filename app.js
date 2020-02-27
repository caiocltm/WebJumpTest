const http = require('http');
const fs = require('fs');
const path = require('path');

const log = require('./logs/logger');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const server = http.createServer();

server
.on('request', (req, res) => {

	log.info({
		level: 'info',
		message: {
			type: 'Request Info',
			method: req.method,
			url: req.url,
			params: req.params
		}
	});

	req.on('error', (error) => log.error({
		level: 'error',
		message: {
			type: 'Request Error',
			method: req.method,
			url: req.url,
			params: req.params,
			error: error
		}
	}));

	const RAW_URL = req.url.toString().trim();
	const CONVERTED_URL = RAW_URL.split('.').length === 1 ? RAW_URL : RAW_URL.split('.')[1];
	
	const ROUTES = {

		GET: _ => {
			const ROUTES = {
				'/': _ => {
					res.writeHead(200, {'Content-Type': 'text/html'}); 					
					fs.createReadStream(path.join(__dirname, 'assets/dashboard.html'), { encoding: 'utf8' })
					.pipe(res);
				},
				'/dashboard': _ => {
					res.writeHead(200, {'Content-Type': 'text/html'}); 					
					fs.createReadStream(path.join(__dirname, `assets/${CONVERTED_URL}.html`), { encoding: 'utf8' })
					.pipe(res);
				},
				'/categories': _ => {
					res.writeHead(200, {'Content-Type': 'text/html'}); 					
					fs.createReadStream(path.join(__dirname, `assets/${CONVERTED_URL}.html`), { encoding: 'utf8' })
					.pipe(res);
				},
				'/products': _ => { 
					res.writeHead(200, {'Content-Type': 'text/html'}); 					
					fs.createReadStream(path.join(__dirname, `assets/${CONVERTED_URL}.html`), { encoding: 'utf8' })
					.pipe(res);
				},
				'/addProduct': _ => {
					res.writeHead(200, {'Content-Type': 'text/html'}); 					
					fs.createReadStream(path.join(__dirname, `assets/${CONVERTED_URL}.html`), { encoding: 'utf8' })
					.pipe(res);
				},
				'/addCategory': _ => { 
					res.writeHead(200, {'Content-Type': 'text/html'}); 					
					fs.createReadStream(path.join(__dirname, `assets/${CONVERTED_URL}.html`), { encoding: 'utf8' })
					.pipe(res);
				},
				'css': _ => {
					res.writeHead(200, {"Content-Type": "text/css"});
					fs.createReadStream(path.join(__dirname, 'assets', RAW_URL), { encoding: 'utf8' })
					.pipe(res);
				},
				'png': _ => {
					res.writeHead(200, {"Content-Type": "image/png"});
					fs.createReadStream(path.join(__dirname, 'assets', RAW_URL), { encoding: 'utf8' })
					.pipe(res);
				},
				'404': _ => {
					res.writeHead(404, {'Content-Type': 'text/html'});
					fs.createReadStream(`./assets/404.html`, { encoding: 'utf8' }).pipe(res);
				}
			};

			ROUTES[CONVERTED_URL] ? ROUTES[CONVERTED_URL]() : ROUTES['404']();
		},

		POST: _ => {
			res.writeHead(200, {'Content-Type': 'application/json'}); 
			res.write({ message: "Posting Products" });
			res.end();
		},

		PUT: _ => {
			res.writeHead(200, {'Content-Type': 'application/json'}); 
			res.write({ message: "Updating Products" });
			res.end();
		},

		DELETE: _ => {
			res.writeHead(200, {'Content-Type': 'application/json'}); 
			res.write({ message: "Deleting Products" });
			res.end();
		}

	}[req.method]();
})

.on('error', (error) => log.error({
	level: 'error',
	message: {
		type: 'Request Error',
		method: req.method,
		url: req.url,
		error: error
	}
}))

.on('close', () => log.info({
	level: 'info',
	message: {
		type: 'Server Closed'
	}
}))

.listen(PORT, HOSTNAME, _ => console.log(`Server running at http://${HOSTNAME}:${PORT}/`));