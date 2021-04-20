'use strict';
const Producer = require('./producer');
const config  = require('./kafka-config');

module.exports = [
	{
		method: 'GET',
		path: '/{username}',
		handler: function(request, h) {

			return h.response("Hello " + request.params.username);
		}
	},
	{
		method: 'POST',
		path: '/sendMessage',
		handler: async function(request, h) {

			if (Producer.ready) {

				// Producer.createTopics([config.KafkaTopic], function (err, data) {
				//     console.log(config.KafkaTopic + " is created");
				// });

		        console.log('Producer is ready');
		        let payloads = [
		            { topic: config.KafkaTopic, messages: JSON.stringify(request.payload), partition: 0},
		        ];

		        console.log('Sending to ' + config.KafkaTopic);
		        Producer.send(payloads, function (err, message) {
		            if (err) throw err;
		            console.log('Producer sent message: ', JSON.stringify(request.payload));
		        });
		    } else {
		        console.log('Producer is not ready');
		    }
			return h.response("Sent");
		}
	},
];