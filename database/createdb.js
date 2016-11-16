'use strict';

var db = require('./database');


// db.add_user(new db.user({
// 	login: 'sample1@example.com',
// 	password: '123',
// 	name: 'Lorem',
// 	surname: 'Bar',
// 	phone: '',
// 	about: ''
// }));


db.add_photo(new db.photo({
	title: 'Котята',
	tags: ['котята', 'котики'],
	link: 'google.com',
	preview: 'http://storyfox.ru/wp-content/uploads/2015/11/shutterstock_265075847-696x528.jpg'
}));

db.add_photo(new db.photo({
	title: 'Котики',
	tags: ['котята', 'котики', 'коты'],
	link: 'google.com',
	preview: 'http://domikru.net/wp-content/uploads/2015/01/%D0%BA%D0%BE%D1%82%D1%8B-%D1%84%D0%BE%D1%82%D0%BE-22.jpg'
}));

db.add_photo(new db.photo({
	title: 'Космос',
	tags: ['ня', 'лол'],
	link: 'google.com',
	preview: 'https://i.ytimg.com/vi/2tiLPhanijk/maxresdefault.jpg'
}));

db.add_photo(new db.photo({
	title: 'Мемчик',
	tags: ['мемы', 'мимасы'],
	link: 'yandex.ru',
	preview: 'https://files4.adme.ru/files/news/part_120/1206260/preview-650x341-98-1457959373.jpg'
}));
