'use strict';

var app = require('./app');
var db = require('./database/database');


var check_if_home = function(address) {
	return (address === '/' || address === '/index.html') ? true : false;
};

var check_if_authorized = function() {
	return false;
}

var get = function (address, view, promise) {
	promise = promise ? promise : new Promise(function(res, rej) { res({}); });
	app.get(address, function(req, res) {
		promise.then(function (data) {
			if (req.session.user) {
				db.get_user(req.session.user).then(function (user) {
					res.render(view, {
						'data': data,
						'not_home': !check_if_home(address),
						"authorized": true,
						"name": user.name
					});
				});
			} else {
				res.render(view, {
					'data': data,
					'not_home': !check_if_home(address),
					"authorized": false,
				});
			}
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
				if (req.session.user) {
					db.get_user(req.session.user).then(function (user) {
						res.render(view, {
							'data': data,
							'not_home': !check_if_home(address),
							"authorized": true,
							"name": user.name
						});
					});
				} else {
					res.render(view, {
						'data': data,
						'not_home': !check_if_home(address),
						"authorized": false,
					});
				}
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
//get('/index.html', './index');
get('/add-image', './add-image');

app.get('/index.html', function (req, res) {
	db.search(req.query.tag.toLowerCase()).exec(function(err, docs) {
		res.render('./index', {
			"data": docs, 
			"not_home": true,
			"tag": req.query.tag.toLowerCase(),
			"authorized": req.session.user ? true : false,
			"name": req.session.user ? req.session.name : null
		});
	});	
});

app.get('/register', function (req, res) {
	res.render('./reg', {
		"not_home": true,
		"authorized": req.session.user ? true : false,
		"name": req.session.user ? req.session.name : null
	});
});

post('/', './index', db.get_photos_by_page(), function (req, res) {
	db.add_photo(new db.photo({
		title: req.body.title,
		tags: [req.body.tags],
		link: req.body.link,
		preview: req.body.link
	})).then();
});

app.post('/register', function (req, res) {
	db.add_user(new db.user({
		login: req.body.login,
		password: req.body.password,
		name: req.body.name,
		surname: req.body.surname,
		phone: req.body.phone,
		about: req.body.about
	})).then(function () {
		req.session.user = req.body.login;
		db.get_user(req.session.user).then(function (user) {
			req.session.name = user.name;
			res.redirect('/');
		});
	});
});

app.post('/login', function (req, res) {
	db.get_user(req.body.login).then(function (user) {
		if (!user) {
			res.redirect('/error');
		} else {
			req.session.user = user.login;
			req.session.name = user.name;
			res.redirect('/');
		}
	});
});

app.get('/exit', function (req, res) {
	req.session.user = undefined;
	req.session.name = undefined;
	res.redirect('/');
});

get('*', './404');
