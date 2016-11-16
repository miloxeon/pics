'use strict';

var app = require('./app');
var db = require('./database/database');


var check_if_home = function(address) {
	return (address === '/' || address === '/index.html') ? true : false;
}

var take_care = function(address, view, promise) {
	promise = promise ? promise : new Promise(function(res, rej) { res({}); });
	app.get(address, function(req, res) {
		promise.then(function(data) {
			res.render(view, {'data': data});
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

take_care('/', './index', db.get_photos_by_page());
take_care('/index.html', './index');
take_care('*', './404');
// take_care('*', './index', db.get_user('sample1@example.com'));
