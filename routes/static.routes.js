const path = require('path');
const fs = require('fs');

module.exports = new class StaticRoutes {

	serve({ res, route, file = "" }) {

		return {

			'/': _ => {
				res.writeHead(200, {'Content-Type': 'text/html'}); 					
				fs.createReadStream(path.join(__dirname, '../assets/templates/', 'dashboard.html'), { encoding: 'utf8' })
				.pipe(res);
			},

			'/dashboard': _ => {
				res.writeHead(200, {'Content-Type': 'text/html'}); 					
				fs.createReadStream(path.join(__dirname, '../assets/templates/', 'dashboard.html'), { encoding: 'utf8' })
				.pipe(res);
			},

			'/categories': _ => {
				res.writeHead(200, {'Content-Type': 'text/html'}); 					
				fs.createReadStream(path.join(__dirname, '../assets/templates/category/', `${file}.html`), { encoding: 'utf8' })
				.pipe(res);
			},

			'/addCategory': _ => {
				res.writeHead(200, {'Content-Type': 'text/html'}); 					
				fs.createReadStream(path.join(__dirname, '../assets/templates/category/', `${file}.html`), { encoding: 'utf8' })
				.pipe(res);
			},

			'/editCategory': _ => {
				res.writeHead(200, {'Content-Type': 'text/html'}); 					
				fs.createReadStream(path.join(__dirname, '../assets/templates/category/', `${file}.html`), { encoding: 'utf8' })
				.pipe(res);
			},

			'/deleteCategory': _ => {
				res.writeHead(200, {'Content-Type': 'text/html'}); 					
				fs.createReadStream(path.join(__dirname, '../assets/templates/category/', `${file}.html`), { encoding: 'utf8' })
				.pipe(res);
			},

			'/products': _ => { 
				res.writeHead(200, {'Content-Type': 'text/html'}); 					
				fs.createReadStream(path.join(__dirname, '../assets/templates/product/', `${file}.html`), { encoding: 'utf8' })
				.pipe(res);
			},

			'/addProduct': _ => {
				res.writeHead(200, {'Content-Type': 'text/html'}); 					
				fs.createReadStream(path.join(__dirname, '../assets/templates/product/', `${file}.html`), { encoding: 'utf8' })
				.pipe(res);
			},

			'/editProduct': _ => {
				res.writeHead(200, {'Content-Type': 'text/html'}); 					
				fs.createReadStream(path.join(__dirname, '../assets/templates/product/', `${file}.html`), { encoding: 'utf8' })
				.pipe(res);
			},

			'/deleteProduct': _ => {
				res.writeHead(200, {'Content-Type': 'text/html'}); 					
				fs.createReadStream(path.join(__dirname, '../assets/templates/product/', `${file}.html`), { encoding: 'utf8' })
				.pipe(res);
			},

			'css': _ => {
				res.writeHead(200, {"Content-Type": "text/css"});
				fs.createReadStream(path.join(__dirname, '../assets', file), { encoding: 'utf8' })
				.pipe(res);
			},

			'js': _ => {
				res.writeHead(200, {"Content-Type": "text/javascript"});
				fs.createReadStream(path.join(__dirname, '../assets', file), { encoding: 'utf8' })
				.pipe(res);
			},

			'png': _ => {
				res.writeHead(200, {"Content-Type": "image/png"});
				fs.createReadStream(path.join(__dirname, '../assets', file))
				.pipe(res);
			},

			'404': _ => {
				res.writeHead(404, {'Content-Type': 'text/html'});
				fs.createReadStream(path.join(__dirname, '../assets/templates/', 'dashboard.html'), { encoding: 'utf8' })
				.pipe(res);
			}

		}[route]();
	}
};