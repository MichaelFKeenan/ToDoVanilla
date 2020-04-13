import { Router } from 'express';

const router = Router();
const {
  Client
} = require('pg');

//move connection stuff to shared place and import
let client;
//move this into local env var
const connectionString = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'postgresql://postgres:hwaaw488@localhost:5432/todo'

const connectNewClient = () => {
  client = new Client({
      connectionString
  });

  client.connect(err => {
      if (err) {
          console.error('connection error', err.stack)
      }
  })
}

router.get('/', async function (req, res) {
  connectNewClient()

  client.query(itemsDisplayQuery, (clientErr, clientRes) => {
      if (clientErr) throw clientErr;
      if (clientRes.rows == null || clientRes.rows.length < 1) {
          //handle no rows
      }
      const mappedItems = clientRes.rows.map(mapItemDisplay);
      client.end();
      res.json(mappedItems)
  });
});

router.get('/getitem/:id', async function (req, res) {
  try{
      connectNewClient()
      client.query(itemQuery(req.params.id), (clientErr, clientRes) => {
          if (clientErr) throw clientErr;
          if (clientRes.rows == null || clientRes.rows.length < 1) {
              res.status(404).send('Not found');
              return;
          }
          const mappedItem = mapItem(clientRes.rows[0]);
          client.end();
          res.json(mappedItem)
      });
  }
  catch(ex){
      res.status(500).send('Internal Error');
      return;
  }
});

router.post('/', async function (req, res) {
  //handle errors from this

  const newItem = req.body;
  connectNewClient()

  client.query(
      `INSERT INTO items(name, complete, priority, "categoryId", description, effort, "completeBy") 
      VALUES('${newItem.Name}', '${newItem.Complete ? '1' : '0'}', '${newItem.Priority.toString()}', '${newItem.CategoryId.toString()}', '${newItem.Description}', '${newItem.Effort.toString()}', ${newItem.CompleteBy != "" ? `'${newItem.CompleteBy}'` : null })`, (clientErr, clientRes) => {
          if (clientErr) {
              //do all this error handling better!
              res.send(500);

              console.log(clientErr.stack)
              client.end();
          } else {
              client.end();
              res.send(clientRes);
          }
      })
});

router.put('/', async function (req, res) {
  //handle errors from this
  connectNewClient()

  const editedItem = req.body;

  client.query(
      `UPDATE items SET (name, complete, priority, "categoryId", description, effort, "completeBy") 
      = 
      ('${editedItem.Name}', '${editedItem.Complete ? '1' : '0'}', '${editedItem.Priority.toString()}', '${editedItem.CategoryId.toString()}', '${editedItem.Description}', '${editedItem.Effort.toString()}', ${editedItem.CompleteBy != "" ? `'${editedItem.CompleteBy}'` : null })
       where id = ${editedItem.Id.toString()}`, (clientErr, clientRes) => {
          if (clientErr) {
              client.end();

              //do all this error handling better!
              res.send(500);

              console.log(clientErr.stack)
          } else {
              client.end();
              res.send(clientRes);
          }
      })
});

router.put('/toggleItemComplete', async function (req, res) {
  //handle errors from this
  connectNewClient()

  client.query(
      `UPDATE items SET complete = '${req.body.isComplete ? '1' : '0'}'
       where id = ${req.body.completedItemId.toString()}`, (clientErr, clientRes) => {
          if (clientErr) {
              client.end();

              //do all this error handling better!
              res.send(500);

              console.log(clientErr.stack)
          } else {
              client.end();
              res.send(clientRes);
          }
      })
});

router.delete('/', async function (req, res) {
  //handle errors from this

  connectNewClient()

  client.query(
      `DELETE from items where id = ${req.body.Id.toString()}`, (clientErr, clientRes) => {
          if (clientErr) {
              client.end();

              //do all this error handling better!
              res.send(500);

              console.log(clientErr.stack)
          } else {
              client.end();
              res.send(clientRes);
          }
      })
});

const itemsDisplayQuery = `
SELECT 
items.id as item_id,
items.name as item_name,
items.complete,
items.priority,
items.description,
items.effort,
items."completeBy",
items."categoryId" as item_categoryid,
categories.id as category_id,
categories.name as category_name
FROM items INNER JOIN categories ON items."categoryId" = categories.id;
`

const itemQuery = (id) => `
SELECT *
FROM items
WHERE id = ${id};
`

const mapItemDisplay = (item) => {
  return {
      "Id": item.item_id,
      "Name": item.item_name,
      'Complete': item.complete == "1" ? true : false,
      'Priority': item.priority,
      'Description': item.description,
      'Effort': item.effort,
      'CompleteBy': item.completeBy,
      'CategoryId': item.item_categoryid,
      'CategoryName': item.category_name
  };
}

const mapItem = (item) => {
  return {
      "Id": item.id,
      "Name": item.name,
      'Complete': item.complete == "1" ? true : false,
      'Priority': item.priority,
      'Description': item.description,
      'Effort': item.effort,
      'CompleteBy': item.completeBy,
      'CategoryId': item.categoryId,
  };
}

export default router;