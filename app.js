'use strict';

var http = require('http'),
	express = require('express'),
	stylus = require('stylus'),
	bodyParser = require('body-parser'),
	session = require('express-session');

var app = express();
module.exports = app;


app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'pug');

// app.use(express.logger('dev'));
// app.use(app.router);
app.use(stylus.middleware({
	src: './',
	compress: true
}));

app.use(express.static('./'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
// app.use(express.cookieDecoder());
