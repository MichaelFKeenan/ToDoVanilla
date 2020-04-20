import {
  Router
} from 'express';
const path = require('path');

const router = Router();

router.get('/', function (req, res) {
  res.sendFile('/public/items.html', { root: "./" });
});

router.get('/create', function (req, res) {
  res.sendFile('/public/createItem.html', { root: "./" });
});

router.get('/edit', function (req, res) {
  res.sendFile('/public/editItem.html', { root: "./" });
});

export default router;