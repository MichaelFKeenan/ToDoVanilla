const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const path = require('path');
var fs = require('fs');
const bodyParser = require('body-parser');
const {
    promisify
} = require('util')
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const {
    Client
} = require('pg');

const app = express();
const port = 8080;

const compiler = webpack(config);

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
        } else {
            console.log('connected')
        }
    })
}



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Enable "webpack-dev-middleware"
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/create.html'));
});

//extract all this api stuff

app.get('/items', async function (req, res) {
    connectNewClient()

    client.query('SELECT * FROM items;', (clientErr, clientRes) => {
        if (clientErr) throw clientErr;
        if (clientRes.rows == null || clientRes.rows.length < 1) {
            //handle no rows
        }
        const mappedItems = clientRes.rows.map(mapItem);
        client.end();
        res.json(mappedItems)
    });
});

const mapItem = (item) => {
    return {
        "Id": item.id,
        "Name": item.name,
        'Complete': item.complete == "1" ? true : false,
        'Priority': item.priority,
        'CategoryId': item.categoryId
    };
}

app.post('/item', async function (req, res) {
    //handle errors from this

    const newItem = req.body;
    connectNewClient()

    client.query(
        `INSERT INTO items(name, complete, priority, "categoryId") 
        VALUES('${newItem.Name}', '${newItem.Complete ? '1' : '0'}', '${newItem.Priority.toString()}', '${newItem.CategoryId.toString()}')`, (clientErr, clientRes) => {
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

    console.log('done')
});

app.put('/item', async function (req, res) {
    //handle errors from this
    const updatedItem = req.body;
    connectNewClient()

    client.query(
        `UPDATE items SET name = '${updatedItem.Name}',
         complete = '${updatedItem.Complete ? '1' : '0'}', 
         priority = '${updatedItem.Priority.toString()}', 
         "categoryId" = '${updatedItem.CategoryId.toString()}'
         where id = ${updatedItem.Id.toString()}`, (clientErr, clientRes) => {
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

app.delete('/item', async function (req, res) {
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

app.get('/categories', async function (req, res) {
    await fs.readFile('./categories.json', function read(err, data) {
        if (err) {
            throw err;
        }
        res.json(JSON.parse(data));
    });
});

app.listen(process.env.PORT || port, () => {
    console.log('Server started on port:' + port);
});