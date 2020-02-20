var express = require('express');
var app = express();
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
    const filterBtn = document.getElementById('complete-filter-btn');
    console.log(filterBtn);
});

router.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/about.html'));
});

app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/scripts'));

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');