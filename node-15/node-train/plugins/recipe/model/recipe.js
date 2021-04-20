'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeModel = new Schema({
	name: { type: String, required: true },
	cooking_time: { type: Date, required: true },
	prep_time: { type: Date, required: true },
	servers: {type: Number},
	cuisine: {type: String},
	ingredients: {type: String},
	directions: {type: String},
	stars: {type: Number},
	user_id: {type: String}
});

module.exports = mongoose.model('Recipe', recipeModel, 'recipes');