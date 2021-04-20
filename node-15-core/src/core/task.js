'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskModel = new Schema({
	title: { type: String, required: true, index: true, unique: true},
	description: { type: String, required: true },
	reporter: {type: String, required: true },
	assignee: {type: String, required: true },
	status: {type: String, enum: ['Open', 'In-progress', 'Done', 'Closed'], default: 'Open'}
});

module.exports = mongoose.model('Task', taskModel, 'tasks');