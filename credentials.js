
var request = require('request-promise');

const url = process.env.URL ? process.env.URL : "https://to-do-vanilla.herokuapp.com"

export default {
    clientID: '676145830685-dgaoc9b2qqcmihl08t1p1ah5r9s0aa43.apps.googleusercontent.com',
    clientSecret: 'tbCjOo7Y2TP6Sx_uDuivYWoP',
    callbackURL: `${url}/auth/google/callback`
  }