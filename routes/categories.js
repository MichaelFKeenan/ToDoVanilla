import {
  Router
} from 'express';
const path = require('path');

const router = Router();

router.use('/', function(req, res, next){
  if(!req.user){
    console.log('no user');
    res.redirect('/auth/google');
  }
  console.log('user');
  next();
});

router.get('/', function (req, res) {
  res.sendFile('/public/categories.html', { root: "./" });
})

router.get('/create', function (req, res) {
  res.sendFile('/public/createCategory.html', { root: "./" });
})


export default router;