import {} from 'dotenv/config'

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const path = require('path');
const bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

import apiRoutes from './api/routes';
import webRoutes from './routes/routes';

const app = express();
const port = 8080;

const compiler = webpack(config);

//what's this for? probably shouldnt be in plain text here!
//env var?
app.use(session({secret: 'some secret'}))

require('./config/passport')(app);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Enable "webpack-dev-middleware"
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(express.static('./public'));

app.use('/api/items', apiRoutes.items);
app.use('/api/categories', apiRoutes.categories);
app.use('/auth', webRoutes.auth);

//move all the routes into ./routes
app.get('/', function (req, res) {
    if(req.user){
        console.log('user: ', req.user.id)
    }
    res.sendFile(path.join(__dirname + '/public/items.html'));
})

app.get('/items/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/createItem.html'));
});

app.get('/items/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/editItem.html'));
});

app.get('/categories/list', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/categories.html'));
})

app.get('/categories/create', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/createCategory.html'));
})

app.listen(process.env.PORT || port, () => {
    console.log('Server started on port:' + port);
});