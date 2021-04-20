'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
	username: { type: String, required: true, index: true, unique: true},
	password: { type: String, required: true },
	roles: {type: Array }
});

module.exports = mongoose.model('User', userModel, 'users');