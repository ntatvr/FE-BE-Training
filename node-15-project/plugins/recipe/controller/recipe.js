const Recipe =  require('../model/recipe');

async function findOne(request, h) {
	let recipe = await Recipe.findById(request.params.id);
	if (!recipe) return {message: 'Recipe not found!'};
	return recipe;
}

exports.find = async (request, h) => {
	return Recipe.find({});
}

exports.findOne = async (request, h) => {
	return findOne(request, h);
}

exports.save = async (request, h) => {
	let recipeData = new Recipe();
	if (request.params.id) {
		recipeData = await findOne(request, h);
	}

	let currentDate = new Date();
	recipeData.name = request.payload.name;
	recipeData.cooking_time = currentDate;
	recipeData.prep_time = currentDate;
	
	await recipeData.save();
	return { message: "Recipe is updated successfully", recipe: recipeData };
}

exports.delete = async (request, h) => {
	await (await findOne(request, h)).deleteOne();
	return {success: true};
}