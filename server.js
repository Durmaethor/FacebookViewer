
// Working Facebook login / authentication

var express = require('express');
var passport = require('passport');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

app.use(session({secret: "I am a nerd"}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: '1506083429423908',
  clientSecret: '1deb7fd14110848ce2aff9334eef165a',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, next) {
  return next(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/me',
    failureRedirect: '/auth/facebook'
}), function(req,res){
    console.log(req.session);
});

passport.serializeUser(function(user, done){ //turns this into a string to put on session
    done(null, user);
});

passport.deserializeUser(function(obj, done){ //turns back into an object to pull off session
    done(null, obj);
});

app.get('/me', function(req, res){
    res.send(req.user);
});




app.listen(3000, function(){
    console.log("We have ears");
});