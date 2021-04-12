var User =  require('../models/user');
var Authentication =  require('../auth/authentication');

async function findOne(request, h) {
	var user = await User.findById(request.params.id);
	if (!user) return {message: 'User not found!'};
	return user;
}

exports.find = async (request, h) => {
	return User.find({});
}

exports.findOne = async (request, h) => {
	return findOne(request, h);
}

exports.save = async (request, h) => {
	var userData = new User();
	if (request.params.id) {
		userData = await findOne(request, h);
	}
	userData.username = request.payload.username;
	userData.password = await Authentication.encrypt(request.payload.password);
	console.log(userData);
	await userData.save();
	return { message: "User is updated successfully", user: userData };
}

exports.delete = async (request, h) => {
	await (await findOne(request, h)).deleteOne();
	return {success: true};
}