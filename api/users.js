import {
  Router
} from 'express';
import {
  getUsers,
  getUserByEmailAddress,
  createUser
} from './services/usersService';

const router = Router();

router.get('/', async function (req, res) {
  try {
    const result = await getUsers();
    res.json(result);
  } catch (ex) {
    res.status(500).send('Internal Error');
    return;
  }
});

router.get('/getUser/:emailAddress', async function (req, res) {
  try {
    const user = await getUserByEmailAddress(req.params.emailAddress);
    if (user == null) {
      res.status(404).send('Not found');
    }
    res.json(user)
  } catch (ex) {
    res.status(500).send('Internal Error');
    return;
  }
});

router.post('/', async function (req, res) {
  try {
    const result = await createUser(req.body);
    res.json(result);
  } catch (ex) {
    res.status(500).send('Internal Error');
    return;
  }
});

export default router;