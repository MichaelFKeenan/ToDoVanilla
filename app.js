const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const path = require('path');

const app = express();
const port = 8080;

const compiler = webpack(config);

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

app.listen(port, () => {
    console.log('Server started on port:' + port);
});