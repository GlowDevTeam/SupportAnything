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

app.use(logger('combined'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({
	secret: 'gatonaboleia',
  resave: true,
  saveUninitialized: true
}));
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

// root page
app.get('/', isLoggedIn, function(req, res) {
	res.render('pages/index',{user: req.user});
});

// login page
app.get('/login', function(req, res) {
	res.render('pages/login',{user: res.user});
});

// about page
app.get('/about', function(req, res) {
	res.render('pages/about');
});

// contact page
app.get('/contact', function(req, res) {
	res.render('pages/contact');
});

// run call
app.post('/run', function(req, res) {
	var maskimage = 'resources' + req.body.mask;
	app.ImageProcessing.ProcessImage.addMask(req.user.id, req.user.localProfilePicture, maskimage, function(result){
		res.send(result);
	});
});

// facebook auth call
app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile'] }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback', function(req, res, next){

	passport.authenticate('facebook', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
	    app.ImageProcessing.ProcessImage.saveProfilePicture(req.user.id, req.user.profilePicture, function (result){
	      req.user.localProfilePicture = 'resources/Images/'+ result + '.jpg';
	      return res.redirect('/');
	    });
    });
  })(req, res, next)

});

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

app.listen((process.env.PORT || 5000));
console.log('Listening on port process.env.PORT || 5000');
