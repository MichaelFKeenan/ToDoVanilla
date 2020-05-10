import {
  Router
} from 'express';
var passport = require('passport');

const router = Router();

router.route('/google/callback')
  //handle errors properly!
  .get(passport.authenticate('google', {
    successRedirect: '/',
    failure: 'error'
  }));

router.route('/google')
  .get(passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ]
  }));

export default router;