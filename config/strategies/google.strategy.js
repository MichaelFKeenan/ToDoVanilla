var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var request = require('request-promise');

const url = process.env.URL ? process.env.URL : "https://to-do-vanilla.herokuapp.com"

module.exports = () => {
  passport.use(new GoogleStrategy({
      clientID: '676145830685-dgaoc9b2qqcmihl08t1p1ah5r9s0aa43.apps.googleusercontent.com',
      clientSecret: 'tbCjOo7Y2TP6Sx_uDuivYWoP',
      callbackURL: `${url}/auth/google/callback`
    },
    async function (req, accessToken, refreshToken, profile, done) {
      let userInDb = await GetUserByEmailAddress(profile.emails[0].value);
      if (!userInDb) {
        await CreateUser(profile);
        //this is kinda yuck, would it be crazy to have the create return the new user?
        userInDb = await GetUserByEmailAddress(profile.emails[0].value);
      }
      //this also aint pretty ( :-( -)
      if(!userInDb){
        throw Error("something went wrong loggin in!")
      }
      
      //if user was created some other way (exists but no google id)
      //add google id to user
      //doesn't matter until another way of creating users introduced

      done(null, userInDb);
    }
  ))
}

GetUserByEmailAddress = async (emailAddress) => {
  //what if the user exists from another type of sign in? should check by email instead?
  const options = {
    // uri: `http://localhost:8080/api/users/getUser/${emailAddress}`,
    uri: `${url}/api/users/getUser/${emailAddress}`,
    method: 'GET',
    // qs: {
    //   emailAddress: emailAddress
    // },
    json: true
  }
  let user = null;
  await request(options)
    .then((result) => {
      user = result
    })
    .catch((error) => {
      if (error.statusCode == 404) {
        return null;
      }
      throw error;
    })
  return user;
}

CreateUser = async (profile) => {
  var user = {};

  user.emailAddress = profile.emails[0].value;
  user.imageUrl = profile._json.picture;
  user.displayName = profile.displayName;

  user.googleId = profile.id;

  const options = {
    uri: `${url}/api/users/`,
    method: 'POST',
    body: user,
    json: true
  }

  let response = null;
  await request(options)
    .then((result) => {
      response = result
    })
    .catch((error) => {
      throw (error)
    })
  return response;
}