const http = require('http');
const fs = require('fs');
const path = require('path');

const log = require('./logs/logger');
const database = require('./database/database');
const parser = require('./helpers/bodyParser.helper');

const categoryController = require('./controllers/category');
const productController = require('./controllers/product');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;
const DATABASE_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'webjump';

const server = http.createServer();

database.connect(`${DATABASE_URL}/${DATABASE_NAME}`)
.then(_ => {
	console.log(`Connected with the MongoDB database: ${DATABASE_URL}/${DATABASE_NAME}.`);
	server
		.on('request', (req, res) => {

			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			res.setHeader('Access-Control-Allow-Credentials', true);

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

			const METHODS = {

				GET: _ => {

					const GET_ROUTES = {

						'/': _ => {
							res.writeHead(200, {'Content-Type': 'text/html'}); 					
							fs.createReadStream(path.join(__dirname, 'assets/templates/dashboard.html'), { encoding: 'utf8' })
							.pipe(res);
						},

						'/dashboard': _ => {
							res.writeHead(200, {'Content-Type': 'text/html'}); 					
							fs.createReadStream(path.join(__dirname, `assets/templates/${CONVERTED_URL}.html`), { encoding: 'utf8' })
							.pipe(res);
						},

						'/categories': _ => {
							res.writeHead(200, {'Content-Type': 'text/html'}); 					
							fs.createReadStream(path.join(__dirname, `assets/templates/category/${CONVERTED_URL}.html`), { encoding: 'utf8' })
							.pipe(res);
						},

						'/addCategory': _ => {
							res.writeHead(200, {'Content-Type': 'text/html'}); 					
							fs.createReadStream(path.join(__dirname, `assets/templates/category/${CONVERTED_URL}.html`), { encoding: 'utf8' })
							.pipe(res);
						},

						'/editCategory': _ => {
							res.writeHead(200, {'Content-Type': 'text/html'}); 					
							fs.createReadStream(path.join(__dirname, `assets/templates/category/${CONVERTED_URL}.html`), { encoding: 'utf8' })
							.pipe(res);
						},

						'/deleteCategory': _ => {
							res.writeHead(200, {'Content-Type': 'text/html'}); 					
							fs.createReadStream(path.join(__dirname, `assets/templates/category/${CONVERTED_URL}.html`), { encoding: 'utf8' })
							.pipe(res);
						},

						'/categories/fetch': _ => categoryController.fetchCategories(res),

						'/products': _ => { 
							res.writeHead(200, {'Content-Type': 'text/html'}); 					
							fs.createReadStream(path.join(__dirname, `assets/templates/product/${CONVERTED_URL}.html`), { encoding: 'utf8' })
							.pipe(res);
						},

						'/products/fetch': _ => productController.fetchProducts(res),

						'/addProduct': _ => {
							res.writeHead(200, {'Content-Type': 'text/html'}); 					
							fs.createReadStream(path.join(__dirname, `assets/templates/product/${CONVERTED_URL}.html`), { encoding: 'utf8' })
							.pipe(res);
						},

						'/editProduct': _ => {
							res.writeHead(200, {'Content-Type': 'text/html'}); 					
							fs.createReadStream(path.join(__dirname, `assets/templates/product/${CONVERTED_URL}.html`), { encoding: 'utf8' })
							.pipe(res);
						},

						'/deleteProduct': _ => {
							res.writeHead(200, {'Content-Type': 'text/html'}); 					
							fs.createReadStream(path.join(__dirname, `assets/templates/product/${CONVERTED_URL}.html`), { encoding: 'utf8' })
							.pipe(res);
						},

						'css': _ => {
							res.writeHead(200, {"Content-Type": "text/css"});
							fs.createReadStream(path.join(__dirname, 'assets', RAW_URL), { encoding: 'utf8' })
							.pipe(res);
						},

						'png': _ => {
							res.writeHead(200, {"Content-Type": "image/png"});
							fs.createReadStream(path.join(__dirname, 'assets', RAW_URL))
							.pipe(res);
						},

						'js': _ => {
							res.writeHead(200, {"Content-Type": "text/javascript"});
							fs.createReadStream(path.join(__dirname, 'assets', RAW_URL), { encoding: 'utf8' })
							.pipe(res);
						},

						'404': _ => {
							res.writeHead(404, {'Content-Type': 'text/html'});
							fs.createReadStream(`./assets/templates/404.html`, { encoding: 'utf8' }).pipe(res);
						}

					};
					GET_ROUTES[CONVERTED_URL] ? GET_ROUTES[CONVERTED_URL]() : GET_ROUTES['404']();
				},

				POST: _ => {

					const POST_ROUTES = {

						'/category/add': _ => parser.body(req, (body) => categoryController.addCategory(res, body)),

						'/product/add': _ => parser.body(req, (body) => productController.addProduct(res, body)),

						'404': _ => {
							res
							.writeHead(404, { 'Content-Type' : 'application/json' })
							.end(
								JSON.stringify(
									{ message: 'URL Not Found' }
								)
							);
						}

					};
					POST_ROUTES[CONVERTED_URL] ? POST_ROUTES[CONVERTED_URL]() : POST_ROUTES['404']();
				},

				PUT: _ => {
					
					const PUT_ROUTES = {

						'/category/update': _ => parser.body(req, (body) => categoryController.updateCategory(res, body)),
						
						'/product/update': _ => parser.body(req, (body) => productController.updateProduct(res, body)),

						'404': _ => {
							res
							.writeHead(404, { 'Content-Type' : 'application/json' })
							.end(
								JSON.stringify(
									{ message: 'URL Not Found' }
								)
							);
						}

					};
					PUT_ROUTES[CONVERTED_URL] ? PUT_ROUTES[CONVERTED_URL]() : PUT_ROUTES['404']();
				},

				DELETE: _ => {
					const DELETE_ROUTES = {

						'/category/delete': _ => parser.body(req, (body) => categoryController.deleteCategory(res, body)),

						'/product/delete': _ => parser.body(req, (body) => productController.deleteProduct(res, body)),

						'404': _ => {
							res
							.writeHead(404, { 'Content-Type' : 'application/json' })
							.end(
								JSON.stringify(
									{ message: 'URL Not Found' }
								)
							);
						}

					};
					DELETE_ROUTES[CONVERTED_URL] ? DELETE_ROUTES[CONVERTED_URL]() : DELETE_ROUTES['404']();
				}
				
			}[req.method]();
		})

		.on('error', (error) => log.error({
			level: 'error',
			message: {
				type: 'Request Error',
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
})
.catch(error => log.error({
	level: 'error',
	message: {
		type: 'Request Error',
		method: req.method,
		url: req.url,
		error: error
	}
}));