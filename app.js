const http = require('http');

// Setting env globally.
global.ENV = require('./.env');

// Logger
const log = require('./logs/logger');

// Helpers
const database = require('./database/database');
const parser = require('./helpers/bodyParser.helper');

// Routes
const staticRoutes = require('./routes/static.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');

// HTTP Server Instance.
const server = http.createServer();

database.connect(`${ENV.DATABASE_URL}/${ENV.DATABASE_NAME}`)
.then(_ => {

	console.log(`Connected with the MongoDB database: ${ENV.DATABASE_URL}/${ENV.DATABASE_NAME}.`);
	
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

			const URL = req.url.toString().trim();
			const ROUTE = URL.split('.').length === 1 ? URL : URL.split('.')[1];

			const METHODS = {

				GET: _ => {

					const GET_ROUTES = {

						'/': _ => staticRoutes.serve({ res: res, route: ROUTE }),

						'/dashboard': _ => staticRoutes.serve({ res: res, route: ROUTE }),

						'/categories': _ => staticRoutes.serve({ res: res, route: ROUTE, file: URL }),

						'/addCategory': _ => staticRoutes.serve({ res: res, route: ROUTE, file: URL }),

						'/editCategory': _ => staticRoutes.serve({ res: res, route: ROUTE, file: URL }),

						'/deleteCategory': _ => staticRoutes.serve({ res: res, route: ROUTE, file: URL }),

						'/categories/fetch': _ => categoryRoutes.get({ res: res, route: ROUTE }),

						'/products': _ => staticRoutes.serve({ res: res, route: ROUTE, file: URL }),

						'/products/fetch': _ => productRoutes.get({ res: res, route: ROUTE }),

						'/addProduct': _ => staticRoutes.serve({ res: res, route: ROUTE, file: URL }),

						'/editProduct': _ => staticRoutes.serve({ res: res, route: ROUTE, file: URL }),

						'/deleteProduct': _ => staticRoutes.serve({ res: res, route: ROUTE, file: URL }),

						'css': _ => staticRoutes.serve({ res: res, route: ROUTE, file: URL }),

						'png': _ => staticRoutes.serve({ res: res, route: ROUTE, file: URL }),

						'js': _ => staticRoutes.serve({ res: res, route: ROUTE, file: URL }),

						'404': _ => staticRoutes.serve({ res: res, route: '404' }),

					};
					GET_ROUTES[ROUTE] ? GET_ROUTES[ROUTE]() : GET_ROUTES['404']();
				},

				POST: _ => {

					const POST_ROUTES = {

						'/category/add': _ => parser.body(req, (body) => categoryRoutes.post({ res: res, route: ROUTE, payload: body })),

						'/product/add': _ => parser.formData(req, (body) => productRoutes.post({ res: res, route: ROUTE, payload: body })),

						'404': _ => staticRoutes.serve({ res: res, route: '404' })

					};
					POST_ROUTES[ROUTE] ? POST_ROUTES[ROUTE]() : POST_ROUTES['404']();
				},

				PUT: _ => {
					
					const PUT_ROUTES = {

						'/category/update': _ => parser.body(req, (body) => categoryRoutes.put({ res: res, route: ROUTE, payload: body })),
						
						'/product/update': _ => parser.formData(req, (body) => productRoutes.put({ res: res, route: ROUTE, payload: body })),

						'404': _ => staticRoutes.serve({ res: res, route: '404' })

					};
					PUT_ROUTES[ROUTE] ? PUT_ROUTES[ROUTE]() : PUT_ROUTES['404']();
				},

				DELETE: _ => {
					const DELETE_ROUTES = {

						'/category/delete': _ => parser.body(req, (body) => categoryRoutes.delete({ res: res, route: ROUTE, payload: body })),

						'/product/delete': _ => parser.body(req, (body) => productRoutes.delete({ res: res, route: ROUTE, payload: body })),

						'404': _ => staticRoutes.serve({ res: res, route: '404' })

					};
					DELETE_ROUTES[ROUTE] ? DELETE_ROUTES[ROUTE]() : DELETE_ROUTES['404']();
				},

				OPTIONS: _ => {
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
					res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
					res.setHeader('Access-Control-Allow-Credentials', true);
					res.end();
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

		.listen(ENV.SERVER_PORT, ENV.SERVER_HOSTNAME, _ => console.log(`Server running at http://${ENV.SERVER_HOSTNAME}:${ENV.SERVER_PORT}/`));
})
.catch(error => log.error({
	level: 'error',
	message: {
		type: 'Database Connection Error',
		method: req.method,
		url: req.url,
		error: error
	}
}));