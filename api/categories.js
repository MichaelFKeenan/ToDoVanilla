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

  client.query('SELECT * FROM categories;', (clientErr, clientRes) => {
      if (clientErr) throw clientErr;
      if (clientRes.rows == null || clientRes.rows.length < 1) {
          //handle no rows
      }
      const mappedCategories = clientRes.rows.map(mapCategory);
      client.end();
      res.json(mappedCategories)
  });
});

router.post('/', async function (req, res) {
  //handle errors from this

  const newCategory = req.body;
  connectNewClient()

  client.query(
      `INSERT INTO categories(name) 
      VALUES('${newCategory.Name}')`, (clientErr, clientRes) => {
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

const mapCategory = (category) => {
  return {
      "Id": category.id,
      "Name": category.name,
  };
}

export default router;