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

app.get('auth/facebook', passport.authenticate('facebook'));
app.get('auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
}), function(req,res){
    console.log(req.session);
});

app.get('/', requireAuth, function(req, res){
    return res.sendFile(__dirname+'/public/home.html');
});





app.listen(3000, function(){
    console.log("We have ears");
});