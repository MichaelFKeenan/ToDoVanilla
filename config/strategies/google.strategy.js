var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = () => {
  //swap out url based on env var?
  //not that google is accepting the heroku domain... :(
  passport.use(new GoogleStrategy({
      clientID: '676145830685-dgaoc9b2qqcmihl08t1p1ah5r9s0aa43.apps.googleusercontent.com',
      clientSecret: 'tbCjOo7Y2TP6Sx_uDuivYWoP',
      callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    function (req, accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  ))
}