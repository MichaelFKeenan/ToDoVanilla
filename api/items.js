import {
  Router
} from 'express';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  toggleItemComplete,
  deleteItem
} from './services/itemsService';

const router = Router();

router.get('/', async function (req, res) {
  try {
    const result = await getItems();
    res.json(result);
  } catch (ex) {
    res.status(500).send('Internal Error');
    return;
  }
});

router.get('/getitem/:id', async function (req, res) {
  try {
    const item = await getItem(req.params.id);
    if (item == null) {
      res.status(404).send('Not found');
    }
    res.json(item)
  } catch (ex) {
    res.status(500).send('Internal Error');
    return;
  }
});

router.post('/', async function (req, res) {
  try {
    res.json(await createItem(req.body));
  } catch (ex) {
    res.status(500).send('Internal Error');
    return;
  }
});

router.put('/', async function (req, res) {
  try {
    res.json(await updateItem(req.body));
  } catch (ex) {
    res.status(500).send('Internal Error');
    return;
  }
});

router.put('/toggleItemComplete', async function (req, res) {
  try {
    res.json(await toggleItemComplete(req.body.completedItemId, req.body.isComplete));
  } catch (ex) {
    res.status(500).send('Internal Error');
    return;
  }
});

router.delete('/', async function (req, res) {
  try {
    res.json(await deleteItem(req.body.Id));
  } catch (ex) {
    res.status(500).send('Internal Error');
    return;
  }
});

export default router;