'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
	username: { type: String, required: true, index: true, unique: true},
	password: { type: String, required: true },
	scope: {type: Array }
});

// Hide properties of Mongoose objects in Node.JS JSON responses
userModel.methods.toJSON = function() {
 var obj = this.toObject();
 delete obj.password;
 return obj;
}

module.exports = mongoose.model('User', userModel, 'users');