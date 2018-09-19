exports.transporter = function(nodemailer) {
	var transporter = nodemailer.createTransport({
	service: "gmail",
    host: "smtp.gmail.com",
	auth: {
	    user: '12130155@st.hcmuaf.edu.vn',
	    pass: '01653354391'
	  },
	secure: false
	});
	return transporter;
}

exports.mailOptions = function(toEmail, subject, content) {

	var mailOptions = {
		from: '12130155@st.hcmuaf.edu.vn',
		to: toEmail,
		subject: subject,
		text: content
	}
	return mailOptions;
}

exports.sendMail = function(transporter, mailOptions) {
	transporter.sendMail(mailOptions, function(error, info){
		console.info(error.message);
	 	if (error) {
	    	console.log(error);
	    	return false;
	  	} else {
	    	console.log('Email sent: ' + info.response);
	    	return true;
	  	}
	});
}