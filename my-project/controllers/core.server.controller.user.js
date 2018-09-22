"user strict";
const userService = require('../service');
const utils = require('../utils').Utils;


// Module public methods.
module.exports = {
	getAllUser: getAllUser,
	getUserById: getUserById,
	addUser: addUser,
	deleteUser: deleteUser
};

/**
* @name deleteUser
* @description
* Delete user
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function deleteUser(req, res) {
	userService.deleteUser(req.body.iduser, function(err, count) {
		if(err){
			console.log(err);
            req.flash('failedMessage', 'Delete Failed!');
        } else{
        	req.flash('successfulMessage', 'Delete successfully!');
        }
        res.redirect('/user');
	});
}

/**
* @name addUser
* @description
* Add user
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function addUser(req, res) {

	// set default value for isActive is false
	if (req.body.isActive == undefined || req.body.isActive != 'on') {
		req.body.isActive = false;
	} else {
		req.body.isActive = true;
	}

	// console.log('iduser: ' + req.body.iduser);
	// console.log('username: ' + req.body.username);
	// console.log('email: ' + req.body.email);
	// console.log('isActive: ' + req.body.isActive);
	if (req.body.iduser == undefined || req.body.iduser == '')
		userService.addUser(req.body, function(err, count) {
			if(err){
				console.log(err);
	            req.flash('failedMessage', 'Insert Failed!');
	        } else{
	        	req.flash('successfulMessage', 'Insert successfully!');
	        }
	        res.redirect('/user');
		});
	else {
		userService.updateUser(req.body, function(err, count) {
			if(err){
				console.log(err);
	            req.flash('failedMessage', 'Update Failed!');
	        } else{
	        	req.flash('successfulMessage', 'Update successfully!');
	        }
	        res.redirect('/user');
		});
	}
}

/**
* @name getUserById
* @description
* Get user by ID
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function getUserById(req, res) {
	var iduser = req.params.id;
	userService.getUserById(iduser, function(err, rows) {
		utils.renderJSON(err, res, rows);
	});
}

/**
* @name getAllUser
* @description
* Get All user
*
* @param  {object} req HTTP request
* @param  {object} res HTTP response
*/
function getAllUser(req, res) {
	userService.getAllUser(function(err, rows) {
		utils.renderJSON(err, res, rows);
	});
}