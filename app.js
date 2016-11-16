'use strict';

var http = require('http'),
	express = require('express'),
	stylus = require('stylus');

var app = express();
module.exports = app;


app.set('port', 3000);
app.set('views', './views');
app.set('view engine', 'pug');

// app.use(express.logger('dev'));
// app.use(app.router);
app.use(stylus.middleware({
	src: './',
	compress: true
}));

app.use(express.static('./'));
