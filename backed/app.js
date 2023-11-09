const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const moment = require('moment-timezone');
const app = express();

// Replace with your actual Gmail API credentials
const CLIENT_ID = '1040345104001-dlr5c05paouuh9j4fve65c6nlevb21ep.apps.googleusercontent.com';
const CLIENT_SECRET = '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';


// Initialize Express and Passport
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth2 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback', // Update with your callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user for sessions
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Define routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const { displayName, emails, photos } = req.user;
    const userTime = moment().tz('Asia/Kolkata').format('LLLL');
    res.send(`
      <div>
        <img src="${photos[0].value}" alt="Profile Picture" width="100">
        <p>Hello ${displayName},</p>
        <a href="/logout">Sign Out</a>
        <p>You are signed in with email ${emails[0].value}</p>
        <p>${userTime}</p>
        
       
        

      </div>
    `);
  
  } else {
    res.send('<a href="/auth/google">Sign In with Gmail</a>');
  }
});

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' }));

app.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
