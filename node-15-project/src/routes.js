'use strict';
const Accept = require('accept');
const Assets = require('./controllers/assets');
const Recipes = require('./models/recipe');
const UserController =  require('./controllers/user');
const RecipeController =  require('./controllers/recipe');
const Fs = require('fs');
const Path = require('path');

const poem = function(request, h) {
    try {
        const data = fs.readFileSync('./poem.txt', 'utf8');
        return data.toString();
    } catch (err) {
        console.error(err)
        throw err;
    }
}

module.exports = [
	{
		method: 'GET',
        path: '/upload',
        handler: function(request, h) {
        	return h.view('upload');
        }
    },
    // hapi will parse multipart/form­data requests by default.
    {
    	config: {
			payload: {
				output: 'stream', // present uploaded file as streams. Done have callback
				parse: true, // attempt to parse payload into an object
				allow: 'multipart/form-data',
				multipart: true
			}
		},
		method: 'POST',
        path: '/upload',
        handler: async function(request, h) {
        	console.log(request.payload.upload);
        	const data = request.payload;

        	if (data.upload) {
        		const name = Path.basename(data.upload.hapi.filename); // get only the lastportion of the path specified in the filename.
	            const path = __dirname + "/uploads/" + name;
	            const file = Fs.createWriteStream(path);

	            file.on('error', (err) => console.error(err));

	            data.upload.pipe(file);

	            data.upload.on('end', (err) => { 
	                const ret = {
	                    filename: data.upload.hapi.filename,
	                    headers: data.upload.hapi.headers
	                }
	                return JSON.stringify(ret);
	            });
        	}
            return h.response('Ok');
        }
    },
	{
		config: {
			pre: [
				{method: poem, assign: 'poem'}
			]
		},
		method: 'GET',
        path: '/',
        handler: function(request, h) {
        	// server.methods.mean(request.payload.values, (err, mean) => {
        	// 	if (err) {
        	// 		throw err;
        	// 	}
        	// 	return h.view('index_en');
        	// });
        	// ;
        	return h.response(request.pre.poem).code(200);
        }
    },
	/* Recipe APIs */
	{
		method: 'GET',
		path: '/api/recipes',
		handler: RecipeController.find
	},
	{
		method: 'GET',
		path: '/api/recipes/{id}',
		handler: RecipeController.findOne
	},
	{
		method: 'POST',
		path: '/api/recipes',
		handler: RecipeController.save
	},
	{
		method: 'PUT',
		path: '/api/recipes/{id}',
		handler: RecipeController.save
	},
	{
		method: 'DELETE',
		path: '/api/recipes/{id}',
		handler: RecipeController.delete
	},
	/* Users APIs */
	{
		method: 'GET',
		path: '/api/users',
		handler: UserController.find
	},
	{
		method: 'GET',
		path: '/api/users/{id}',
		handler: UserController.findOne
	},
	{
		method: 'POST',
		path: '/api/users',
		handler: UserController.save
	},
	{
		method: 'PUT',
		path: '/api/users/{id}',
		handler: UserController.save
	},
	{
		method: 'DELETE',
		path: '/api/users/{id}',
		handler: UserController.delete
	}
];