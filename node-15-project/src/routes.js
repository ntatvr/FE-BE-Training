'use strict';
const Fs = require('fs');
const Path = require('path');
const Got = require('got');

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
        	console.info("info");
		    console.error("error");
		    console.warn("warn");
		    console.log("log");
        	return h.view('upload');
        }
    },
    {
		method: 'GET',
        path: '/download/{ttl?}',
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
        	const response = h.response(downloadStream)
            	.type('image/gif')
    		    .header('Content-type', 'image/gif')
    		    .header('Accept-Ranges', 'bytes'); // cache 24h
            
            if (request.params.ttl) {
                response.ttl(request.params.ttl);
            }

            return response;
        },
        options: {
            cache: {
                expiresIn: 30 * 1000,
                privacy: 'private'
            }
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
];