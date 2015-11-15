var express = require('express');
var app = express();

// set resources
console.log(__dirname + '/resources');
app.use(express.static(__dirname + '/resources'));


// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
	res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
	res.render('pages/about');
});

// about page 
app.get('/contact', function(req, res) {
	res.render('pages/contact');
});

app.listen(8085);
console.log('Listening on port 8085');