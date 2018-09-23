"user strict";

var nodemailer = require('nodemailer');
const config = require('../config');

var email = {
	getTransporter: function () {
		var transporter = nodemailer.createTransport({
			service: "gmail",
		    host: "smtp.gmail.com",
			auth: {
			    user: config.email_auth_user,
			    pass: config.email_auth_pass
			  },
			secure: false
		});
		return transporter;
	},
	getMailOptions: function(toEmail, subject, content) {
		var mailOptions = {
			from: config.email_auth_user,
			to: toEmail,
			subject: subject,
			text: content
		}
		return mailOptions;
	}
}

module.exports = email;