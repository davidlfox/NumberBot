var express = require('express');
var app = express();
var port = 3700;
var numberBot = require('./numberBot');

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function (request, response) {
    response.render('page');
});

app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));
console.log('listening on port: ' + port);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        // process game message
        if (numberBot.isGameMessage(data)) {
            data.message = data.username + ' is playing!';
            data.username = numberBot.name;
        }
        if (numberBot.isGuessMessage(data)) {
            console.log(numberBot.isUserPlaying(data.username));
            if (numberBot.isUserPlaying(data.username)) {
                data = numberBot.getGuessData(data);
            }
        }

        io.sockets.emit('message', data);
    });
});