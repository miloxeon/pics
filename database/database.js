'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pics');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
	console.log("We are connected!");
});


var models = require('./models');

var user = mongoose.model('user', models.user);
var photo = mongoose.model('photo', models.photo);




function get_user(login) {
	return user.findOne({login: login}, function (err, user, affected) {
		if (err) throw err;
	});
}

function add_user(user) {
	user.save(function (err, user, affected) {
		if (err) throw err;
		console.log('User %s (%s %s) have been saved to database', user.login, user.name, user.surname);
	});
}

function edit_user(login, new_user) {}

function delete_user(login) {}

function add_photo(photo) {
	photo.save(function (err, photo, affected) {
		if (err) throw err;
		console.log('Photo "%s" have been saved to database.', photo.title);
	});
}

function edit_photo(id, new_photo) {}

function delete_photo(id) {
	photo.remove({
		"_id": id
	}, function (err) {
		if (err) throw err;
	}).then();
}

function get_photos_by_page(page, photos_per_page) {
	page = page ? page : 1;
	photos_per_page = photos_per_page ? photos_per_page : 15;
	return photo.find({}, function (err, photo, affected) {
		if (err) throw err;
	}).sort('-date');
}

function toggle_like_photo(photo_id, login) {}

function search(tag) {
	var query = photo.find({});
	query.where('tags').in([tag]);
	return query;
	// return photo.find({tags}, function (err, photo, affected) {
	// 	if (err) throw err;
	// }).sort('-date');
}




module.exports.user = user;
module.exports.photo = photo;

module.exports.get_user = get_user;
module.exports.add_user = add_user;
module.exports.edit_user = edit_user;
module.exports.delete_user = delete_user;
module.exports.add_photo = add_photo;
module.exports.edit_photo = edit_photo;
module.exports.delete_photo = delete_photo;
module.exports.search = search;
module.exports.get_photos_by_page = get_photos_by_page;
module.exports.toggle_like_photo = toggle_like_photo;


// ALERT!!!
photo.remove({}, function () {
	var createdb = require('./createdb');
}).then();
