"user strict";
const userService = require('../service');
const email = require('../connection');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// Module public methods.
module.exports = {
	sendMail: sendMail
};

/**
* @name sendMail
* @description
* Send mail to all users
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function sendMail(req, res) {

	myEmitter.on('sendMail', (toEmail, subject, content) => {
	  	var mailOptions = email.getMailOptions(toEmail, subject, content);
	  	email.getTransporter().sendMail(mailOptions, function(error, info) {
			console.info(error.message);
		 	if (error) {
		    	console.log(error);
		  	} else {
		    	console.log('Email sent: ' + info.response);
		  	}
		});
	});

	userService.getAllUser(function(err, rows) {
		rows.forEach(function(row, index) {
			myEmitter.emit('sendMail', row.email, req.body.subject, req.body.content);
			if(err){
				console.log(err);
	            req.flash('failedMessage', 'Send Mail Failed!');
	        } else{
	        	req.flash('successfulMessage', 'Send Mail successfully!');
	        }
		});
		res.redirect('/sendMail');
	});
}