'use strict';
const RecipeController =  require('./controller/recipe');
module.exports = [
	{
		method: 'GET',
		path: '/v1/recipes',
		handler: RecipeController.find,
		options: {
            auth: 'auth-recipe'
        }
	},
	{
		method: 'GET',
		path: '/v1/recipes/{id}',
		handler: RecipeController.findOne
	},
	{
		method: 'POST',
		path: '/v1/recipes',
		handler: RecipeController.save
	},
	{
		method: 'PUT',
		path: '/v1/recipes/{id}',
		handler: RecipeController.save
	},
	{
		method: 'DELETE',
		path: '/v1/recipes/{id}',
		handler: RecipeController.delete
	},
	
];