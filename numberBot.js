var name = 'Number Bot';

var memory = {};

exports.name = name;

exports.isGameMessage = function (data) {
    if (data.message) {
        if (data.message == 'play') {
            memory[data.username] = Math.floor(Math.random() * 9 + 1); // 1 to 10
            return true;
        }
    }

    return false;
};

exports.isGuessMessage = function (data) {
    if (data.message) {
        if (!isNaN(data.message)) {
            return true;
        }
    }

    return false;
};

exports.isUserPlaying = function (name) {
    return memory[name];
};

exports.getGuessData = function (data) {
    var guess = parseInt(data.message);
    console.log('memory[' + data.username + ']: ' + memory[data.username]);
    console.log(guess < memory[data.username]);
    console.log(guess > memory[data.username]);
    console.log(guess == memory[data.username]);
    if (guess < memory[data.username]) {
        data.message = data.username + ', higher!';
    } else if (guess > memory[data.username]) {
        data.message = data.username + ', lower!';
    } else if (guess == memory[data.username]) {
        data.message = data.username + ', you got it!';
        this.removePlayer(data.username);
    }
    data.username = this.name;

    return data;
};

exports.removePlayer = function (name) {
    delete memory[name];
};