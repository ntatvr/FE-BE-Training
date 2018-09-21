"use strict";

const express = require('express');
const app = express();
const port = 3000;
let hbs = require('express-hbs');

//npm install -g nodemon

// Do Registration routes.
require('./routes')(app);

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

// // Set views folder
app.set('views', './views');

app.listen(port, function(err) {
  if(err) {
    console.error('Something error !!');
    console.error(err);
  }

  console.log('App listen on port ' + port);
});