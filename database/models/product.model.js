const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
	nome: {
		type: String,
		required: true
	},
	sku: {
		type: String,
		required: true
	},
	preco: {
		type: String,
		required: true
	},
	descricao: {
		type: String,
		required: true
	},
	quantidade: {
		type: String,
		required: true
	},
	image: {
		type: String
	},
	categoria:[
		{
			type: Schema.Types.ObjectId,
			ref: 'Category'
		}
	]
}, 
	{ timestamps: true }
);

module.exports = model('Product', ProductSchema);