var express = require('express');
var app = express();
var port = 3700;

app.get('/', function (request, response) {
    response.send('it\'s alive!');
});

app.listen(port);
console.log('listening on port: ' + port);