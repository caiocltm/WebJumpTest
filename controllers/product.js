const Product = require('../database/models/product.model');
const log = require('../logs/logger');
const fs = require('fs');
const path = require('path');

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
		let validateSKU = await Product.findOne({ sku: payload.sku });
		if(validateSKU) {
			return response
			.writeHead(201, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: `[addProduct] Product SKU ${payload.sku} already registered, please inform a valid SKU.`,
					product: false
				})
			);
		}
		const product = new Product({
			nome: payload.nome,
			sku: payload.sku,
			preco: payload.preco,
			descricao: payload.descricao,
			quantidade: payload.quantidade,
			categoria: [...payload.categoria.split(',')],
			image: payload.image || ""
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

exports.updateProduct = async (response, payload) => {
	try {
		let validateSKU = await Product.findOne({ sku: payload.sku });
		if(!validateSKU) {
			return response
			.writeHead(200, {'Content-Type': 'application/json'})
			.end(
				JSON.stringify({ 
					message: `[updateProduct] Product SKU ${payload.sku} not found, please inform a valid SKU code.`,
					product: false
				})
			);
		}
		const result = await Product.findOneAndUpdate({ sku: payload.sku }, payload);
		if(result) {
			response
			.writeHead(200, {'Content-Type': 'application/json'})
			.end(
				JSON.stringify({ 
					message: "[updateProduct] Success",
					product: result
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

exports.deleteProduct = async (response, payload) => {
	try {
		let validateProduct = await Product.findOne({ sku: payload.sku });
		if(!validateProduct) {
			return response
			.writeHead(200, {'Content-Type': 'application/json'})
			.end(
				JSON.stringify({ 
					message: `[updateProduct] Product SKU ${payload.sku} not found, please inform a valid SKU code.`,
					product: false
				})
			);
		}

		const pathToDelete = path.join(__dirname, '../assets', validateProduct.image);
		fs.existsSync(pathToDelete) && fs.unlinkSync(pathToDelete);

		const result = await Product.findOneAndDelete({ sku: payload.sku });
		if(result) {
			response
			.writeHead(200, { 'Content-Type' : 'application/json' })
			.end(
				JSON.stringify({ 
					message: "[deleteProduct] Success",
					product: true
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