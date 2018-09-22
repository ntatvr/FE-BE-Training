"user strict";

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
	console.log(req.body);

	userService.getAllUser(function(err, rows) {
		if(err){
			console.log(err);
            req.flash('failedMessage', 'Send Mail Failed!');
        } else{
        	req.flash('successfulMessage', 'Send Mail successfully!');
        }
		res.redirect('/sendMail');
	});
}