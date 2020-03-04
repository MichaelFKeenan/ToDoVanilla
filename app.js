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

const app = express();
const port = 8080;

const compiler = webpack(config);

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

app.get('/items', async function (req, res) {
    await fs.readFile('./toDo.json', function read(err, data) {
        if (err) {
            throw err;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/item', async function (req, res) {
    //handle errors from this
    const result = await readFile('./toDo.json');

    const items = JSON.parse(result);

    const newItem = req.body;
    //YUCK! deffo wanna bring typescipt in
    //also, pull this out to some kinda service because it's deffo gonna be changed/swapped out for db intergration
    if (items.length > 0) {
        newItem.Id = items[items.length - 1].Id + 1;
    } else {
        newItem.Id = 0;
    }

    items.push(newItem)

    //handle errors from this
    await writeFile('./toDo.json', JSON.stringify(items));
    res.send(200);
});

app.listen(process.env.PORT || port, () => {
    console.log('Server started on port:' + port);
});