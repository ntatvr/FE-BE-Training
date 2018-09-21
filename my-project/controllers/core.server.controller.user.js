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
            req.flash('deleteFailed', 'Delete Failed!');
        } else{
        	req.flash('deleteSuccessful', 'Delete successfully!');
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

	userService.addUser(req.body, function(err, count) {
		if(err){
			console.log(err);
            req.flash('addFailed', 'Insert Failed!');
        } else{
        	req.flash('addSuccessful', 'Insert successfully!');
        }
        res.redirect('/user');
	});
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