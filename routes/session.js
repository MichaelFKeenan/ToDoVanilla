import {
  Router
} from 'express';

const router = Router();

router.get('/currentuserid', function (req, res) {
  res.send(req.user.id);
});

export default router;