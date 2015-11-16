var express = require('express')
	, load = require('express-load')
	, passport = require('passport')
  , logger = require('morgan')
  , session = require('express-session')
  , bodyParser = require("body-parser")
  , cookieParser = require("cookie-parser")
  , methodOverride = require('method-override');

var app = express();

require('./config/passport')(passport);

app.use(logger());
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

load('./ImageProcessing/ProcessImage.js').into(app);

// set resources
console.log(__dirname + '/resources');
app.use(express.static(__dirname + '/resources'));


// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
//app.get('/', function(req, res) {
//	res.render('pages/index');
//});

// about page
app.get('/about', function(req, res) {
	res.render('pages/about');
});

// about page
app.get('/contact', function(req, res) {
	res.render('pages/contact');
});

// about page
app.get('/login', function(req, res) {
	res.render('pages/login',{user: res.user});
});

// about page
app.get('/run', function(req, res) {
	app.ImageProcessing.ProcessImage.addMask("resources/Images/albert-einstein.jpg","resources/Images/bandeira-minas.jpg");

});

app.get('/', isLoggedIn, function(req, res) {
	app.ImageProcessing.ProcessImage.addMask(req.user.id, req.user.profilePicture,"resources/Images/bandeira-minas.jpg");
	res.render('pages/index',{user: req.user});
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile'] }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect : '/',
		failureRedirect : '/login'
	}));

// route for logging out
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

app.listen(8085);
console.log('Listening on port 8085');
