import {
  Router
} from 'express';
import {
  getCategories,
  createCategory
} from './services/categoriesService';

const router = Router();

router.get('/', async function (req, res) {
  try {
    const result = await getCategories();
    res.json(result);
  } catch (ex) {
    res.status(500).send('Internal Error');
    return;
  }
});

router.post('/', async function (req, res) {
  try {
    const result = await createCategory(req.body);
    res.json(result);
  } catch (ex) {
    res.status(500).send('Internal Error');
    return;
  }
});

export default router;