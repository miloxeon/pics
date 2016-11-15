'use strict';
var mongoose = require('mongoose');

var user_schema = mongoose.Schema({
	login: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	phone: String,
	about: String
});

var photo_schema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	tags: Array,
	likes: {
		type: Number,
		default: 0
	},
	link: {
		type: String,
		required: true
	},
	preview: {
		type: String,
		required: true
	}
});

module.exports.user = user_schema;
module.exports.photo = photo_schema;
