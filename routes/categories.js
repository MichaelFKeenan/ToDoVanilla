import {
  Router
} from 'express';
const path = require('path');

const router = Router();

router.get('/', function (req, res) {
  res.sendFile('/public/categories.html', { root: "./" });
})

router.get('/create', function (req, res) {
  res.sendFile('/public/createCategory.html', { root: "./" });
})


export default router;