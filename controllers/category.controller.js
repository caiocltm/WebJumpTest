const Category = require('../database/models/category.model');
const log = require('../logs/logger');

exports.fetchCategories = async (response) => {
	try {
		const categories = await Category.find();
		if(categories.length > 0) {
			response
			.writeHead(200, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[fetchCategories] Success",
					categories
				})
			);
		} else {
			response
			.writeHead(204, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[fetchCategories] Empty",
					categories: []
				})
			);
		}
	} catch(error) {
		log.error({
			message: "[fetchCategories] Error",
			error
		});
		response
		.writeHead(500, { 'Content-Type' : 'application/json' })
		.end(
			JSON.stringify({ 
				message: "[fetchCategories] Error",
				error
			})
		);
	}
};

exports.addCategory = async (response, payload) => {
	try {
		let codeExists = await Category.findOne({ codigo: payload.codigo });
		if(codeExists) {
			return response
			.writeHead(201, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: `[addCategory] Category code ${payload.codigo} already exists.`,
					category: false
				})
			);
		}
		const category = new Category({
			nome: payload.nome,
			codigo: payload.codigo
		});
		const result = await category.save();
		if(result === category) {
			response
			.writeHead(201, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[addCategory] Success",
					category: result
				})
			);
		}
	} catch(error) {
		log.error({
			message: "[addCategory] Error",
			error
		});
		response
		.writeHead(500, {'Content-Type': 'application/json'})
		.end(
			JSON.stringify({ 
				message: "[addCategory] Error",
				error
			})
		);
	}
};

exports.updateCategory = async (response, payload) => {
	try {
		const result = await Category.findOneAndUpdate({ codigo: payload.codigo }, payload);
		if(result) {
			response
			.writeHead(200, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[updateCategory] Success",
					category: true
				})
			);
		} else {
			response
			.writeHead(500, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: `[updateCategory] Category code ${payload.codigo} not found, please inform a valid code.`,
					category: false
				})
			);
		}
	} catch(error) {
		log.error({
			message: "[updateCategory] Error",
			error
		});
		response
		.writeHead(500, { 'Content-Type' : 'application/json' }) 
		.end(
            JSON.stringify({ 
			    message: "[updateCategory] Error",
			    error
            })
        );
	}
};

exports.deleteCategory = async (response, payload) => {
	try {
		const result = await Category.findOneAndDelete({ codigo: payload.codigo });
		if(result) {
			response.writeHead(200, {'Content-Type': 'application/json'})
			.end(
                JSON.stringify({ 
                    message: "[deleteCategory] Success",
                    category: true
                })
            );
		} else {
			response.writeHead(500, {'Content-Type': 'application/json'})
			.end(
                JSON.stringify({ 
			    	message: `[deleteCategory] Category code ${payload.codigo} not found, please inform a valid code.`,
                    category: false
                })
            );
		}
	} catch(error) {
		log.error({
			message: "[deleteCategory] Error",
			error
		});
		response.writeHead(500, {'Content-Type': 'application/json'})
		.end(
            JSON.stringify({ 
			    message: "[deleteCategory] Error",
			    error
            })
        );
	}
};