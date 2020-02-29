const productController = require('../controllers/product.controller');

module.exports = new class CategoryRoutes {

	get({ res, route }) {
		return {
			'/products/fetch': _ => productController.fetchProducts(res)
		}[route]();
	}

	post({ res, route, payload }) {
		return {
			'/product/add': _ => productController.addProduct(res, payload)
		}[route]();
	}

	put({ res, route, payload }) {
		return {
			'/product/update': _ => productController.updateProduct(res, payload)
		}[route]();
	}

	delete({ res, route, payload }) {
		return {
			'/product/delete': _ => productController.deleteProduct(res, payload)
		}[route]();
	}

}