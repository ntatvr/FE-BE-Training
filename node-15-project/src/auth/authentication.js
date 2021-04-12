const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.encrypt = async (plaintextPassword) => {
	console.log('plaintextPassword: ', plaintextPassword);
	return await bcrypt.hash(plaintextPassword, saltRounds);
}