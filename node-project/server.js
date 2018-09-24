"use strict";

const express = require('express');
const app = express();
const port = 3000;
let hbs = require('express-hbs');
const session = require('express-session');
const flash = require('req-flash');

//npm install -g nodemon

/**
 * express.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(express.json());

/** 
 * express.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(express.urlencoded({extended: true}));

// app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
// });

// Set static content.
app.use(express.static('./public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
// app.use('/', express.static('./views/commons'));

// Set view template engine for file extension server.view.ejs
// app.engine('ejs', hbs.express4({
//   	extname: '.ejs'
// }));

// Set view engine
app.set('view engine', 'ejs');

// Set views folder
app.set('views', './views');

// Have to use session if you have not used it in server.js yet
app.use(session({
	secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
	resave: false,
	saveUninitialized: true
}));

// Some time we need to print a message after the redirection of page.
app.use(flash());

// Do Registration routes.
require('./routes')(app);

// app.listen(port, function(err) {
//   if(err) {
//     console.error('Something error !!');
//     console.error(err);
//   }

//   console.log('App listen on port ' + port);
// });

var io = require('socket.io').listen(app.listen(port, function(err) {
	if(err) {
	    console.error('Something error !!');
	    console.error(err);
	}

	console.log('App listen on port ' + port);
}));

var messages = [];

io.sockets.on('connection', function (socket) {

	var data = {
    	iduser : '',
    	message: 'Welcome to the chat application.',
    	time: new Date()
    }
    messages.push(data);
    socket.emit('message', messages);
    socket.on('send', function (data) {
    	messages.push(data);
        io.sockets.emit('message', messages);
    });
});