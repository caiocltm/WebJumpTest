const Product = require('../database/models/product.model');
const log = require('../logs/logger');

exports.fetchProducts = async (response) => {
	try {
		const products = await Product.find().populate('categoria');
		if(products.length > 0) {
			response
			.writeHead(200, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[fetchProducts] Success",
					products
				})
			);
		} else {
			response
			.writeHead(204, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[fetchProducts] Empty",
					products: []
				})
			);
		}
	} catch(error) {
		log.error({
			message: "[fetchProducts] Error",
			error
		});
		response
		.writeHead(500, { 'Content-Type' : 'application/json' })
		.end(
			JSON.stringify({ 
				message: "[fetchProducts] Error",
				error
			})
		);
	}
};

exports.addProduct = async (response, payload) => {
	try {
		const product = new Product({
			nome: payload.nome,
			sku: payload.sku,
			preco: parseFloat(payload.preco),
			descricao: payload.descricao,
			quantidade: parseFloat(payload.quantidade),
			categoria: payload.categoria
		});
		const result = await product.save();
		if(result === product) {
			response
			.writeHead(201, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[addProduct] Success",
					product: result
				})
			);
		} else {
			response
			.writeHead(500, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[addProduct] Error",
					error: result
				})
			);
		}
	} catch(error) {
		log.error({
			message: "[addProduct] Error",
			error
		});
		response
		.writeHead(500, { 'Content-Type' : 'application/json' })
		.end(
			JSON.stringify({ 
				message: "[addProduct] Error",
				error
			})
		);
	}
};

exports.updateProduct = async (response, { _id }) => {
	try {
		const result = await Product.updateOne({ _id }, payload);
		if(result) {
			response
			.writeHead(200, {'Content-Type': 'application/json'})
			.end(
				JSON.stringify({ 
					message: "[updateProduct] Success",
					product: result
				})
			);
		} else {
			response
			.writeHead(500, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[updateProduct] Error",
					error: result
				})
			);
		}
	} catch(error) {
		log.error({
			message: "[updateProduct] Error",
			error
		});
		response
		.writeHead(500, { 'Content-Type' : 'application/json' })
		.end(
			JSON.stringify({ 
				message: "[updateProduct] Error",
				error
			})
		);
	}
};

exports.deleteProduct = async (response, { _id }) => {
	try {
		const result = await Product.deleteOne({ _id });
		if(result) {
			response
			.writeHead(200, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[deleteProduct] Success",
					product: true
				})
			);
		} else {
			response
			.writeHead(500, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[deleteProduct] Error",
					error: result
				})
			);
		}
	} catch(error) {
		log.error({
			message: "[deleteProduct] Error",
			error
		});
		response
		.writeHead(500, { 'Content-Type' : 'application/json' })
		.end(
			JSON.stringify({ 
				message: "[deleteProduct] Error",
				error
			})
		);
	}
};