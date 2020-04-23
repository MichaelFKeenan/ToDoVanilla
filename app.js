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
app.use(session({
    secret: 'some secret'
}))

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
app.use('/api/users', apiRoutes.users);

//this MUST come before login stuff, otherwise infinite redirects!
app.use('/auth', webRoutes.auth);

//redirect to login if not logged in
//this MUST come before routes we want to authenticate on
app.use('/*', function (req, res, next) {
    if (!req.user) {
        res.redirect('/auth/google');
    }
    next();
});

app.use('/items', webRoutes.items);
app.use('/categories', webRoutes.categories);
app.use('/session', webRoutes.session);

//move all the routes into ./routes
app.get('/', function (req, res) {
    res.redirect('/items/');
});

app.listen(process.env.PORT || port, () => {
    console.log('Server started on port:' + port);
});