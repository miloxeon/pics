'use strict';

var app = require('./app');
var db = require('./database/database');


var check_if_home = function(address) {
	return (address === '/' || address === '/index.html') ? true : false;
};

var get = function (address, view, promise) {
	promise = promise ? promise : new Promise(function(res, rej) { res({}); });
	app.get(address, function(req, res) {
		promise.then(function (data) {
			res.render(view, {'data': data, 'not_home': !check_if_home(address)});
		});
	});
};


var post = function (address, view, promise, todo) {
	promise = promise ? promise : new Promise(function(res, rej) { res({}); });
	app.post(address, function(req, res) {
		new Promise(function (resolve, reject) {
			todo(req, res);
			resolve();
		}).then(function () {
			promise.then(function (data) {
				res.render(view, {'data': data, 'not_home': !check_if_home(address)});
			});
		});
	});
};


// app.get('/', function (req, res) {	
// 	db.get_user('sample1@example.com').then( function (result) {
// 		res.render('./index',
// 		{
// 			not_home: false,
// 			user_login: result.login,
// 			user_password: result.password
// 		});
// 	});
// 	// res.render('./index', {"not_home": false});
// });

// app.get('/index.html', function (req, res) {	
// 	res.render('./index', {"not_home": false});
// });

// app.get('*', function (req, res) {
// 	res.status(404);
// 	res.render('./404', {"not_home": true})
// });

get('/', './index', db.get_photos_by_page());
get('/index.html', './index');
get('/add-image', './add-image');
post('/', './index', db.get_photos_by_page(), function (req, res) {
	db.add_photo(new db.photo({
		title: req.body.title,
		tags: [req.body.tags],
		link: req.body.link,
		preview: req.body.link
	}));
});

get('*', './404');
