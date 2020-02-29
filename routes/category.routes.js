const categoryController = require('../controllers/category');

module.exports = new class CategoryRoutes {

	get({ res, route }) {
		return {
			'/categories/fetch': _ => categoryController.fetchCategories(res)
		}[route]();
	}

	post({ res, route, payload }) {
		return {
			'/category/add': _ => categoryController.addCategory(res, payload)
		}[route]();
	}

	put({ res, route, payload }) {
		return {
			'/category/update': _ => categoryController.updateCategory(res, payload)
		}[route]();
	}

	delete({ res, route, payload }) {
		return {
			'/category/delete': _ => categoryController.deleteCategory(res, payload)
		}[route]();
	}

};