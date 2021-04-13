'use strict';
const Accept = require('accept');
const Assets = require('./controllers/assets');
const Recipes = require('./models/recipe');
const UserController =  require('./controllers/user');
const RecipeController =  require('./controllers/recipe');
const Fs = require('fs');
const Path = require('path');
const Wreck = require('@hapi/wreck');
const Got = require('got');
const Joi = require('joi');

const poem = function(request, h) {
    try {
        const data = Fs.readFileSync('./poem.txt', 'utf8');
        return data.toString();
    } catch (err) {
        console.error(err)
        throw err;
    }
}

// const preResponse = function(request, h) {
// 	response.events.on('peek', (chunk) => {
// 		console.log('peek');
//     });
//     response.events.once('finish', () => {
//         console.log('finish');
//     });

//     return h.continue;
// }

module.exports = [
	{
		method: 'GET',
        path: '/upload',
        handler: function(request, h) {
        	return h.view('upload');
        }
    },
    {
		method: 'GET',
        path: '/download',
        handler: function(request, h) {

        	//let url = 'https://filesamples.com/samples/video/mp4/sample_3840x2160.mp4';
        	let url = 'https://media0.giphy.com/media/4SS0kfzRqfBf2/giphy.gif';
        	let downloadStream  = Got.stream(url);
        	downloadStream
			  	.on("downloadProgress", ({ transferred, total, percent }) => {
			    	const percentage = Math.round(percent * 100);
			    	console.error(`progress: ${transferred} / ${total} (${percentage}%)`);
			  	})
			  	.on("error", (error) => {
			    	console.error(`Download failed: ${error.message}`);
			});
        	return h.response(downloadStream)
        	.type('image/gif')
		    .header('Content-type', 'image/gif')
		    .header("Accept-Ranges", "bytes");
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
		options: {
			validate: {
				payload: Joi.object({
					username: Joi.string().alphanum().min(6).max(30).required(),
					password: Joi.string().alphanum().min(6).max(30).required()
				})
			}
		},
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
	},
	{
		method: 'GET',
		path: '/users',
		handler: function(request, h) {
        	return h.view('user');
        }
	},
	{
		options: {
			validate: {
				payload: Joi.object({
					username: Joi.string().alphanum().min(6).max(30).required(),
					password: Joi.string().alphanum().min(6).max(30).required()
				}),
				options: {
					abortEarly: false
				},
				failAction : function (request, h, error) {
					const errors = {};
					const details = error.details;
					for (let i = 0; i < details.length; ++i) {
						if (!errors.hasOwnProperty(details[i].path)) {
							errors[details[i].path] = details[i].message;
						}
					}

					return h.view('user', {
						errors: errors,
						values: request.payload
					}).code(error.output.statusCode).takeover();
				}
			}
		},
		method: 'POST',
		path: '/users',
		handler: function(request, h) {
        	return h.view('user');
        }
	},
];