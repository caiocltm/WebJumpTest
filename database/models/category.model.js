const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
	codigo: {
		type: String,
		required: true
	},
	nome: {
		type: String,
		required: true
	}
}, 
	{ timestamps: true }
);

module.exports = model('Category', CategorySchema);