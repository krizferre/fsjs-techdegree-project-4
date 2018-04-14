function Game() {
    this.players = [];
    this.boxes = [];
    this.currentPlayer;
    this.winner;
    this.gameWin = false;
    this.gameDraw = false;
}

Game.prototype.addPlayer = function(player) {
    this.players.push(player);
}

Game.prototype.chooseRandomStartPlayer = function() {
    randomPlayerId = Math.floor(Math.random() * 2);
    this.setCurrentPlayer(this.players[randomPlayerId]);
}

Game.prototype.setCurrentPlayer = function(player) {
    this.currentPlayer = player;

    if (this.currentPlayer.type === 'O') {
        $('#player1').addClass('active');
        $('div .name1 p').addClass('player-name-1-active');
        $('#player2').removeClass('active');
        $('div .name2 p').removeClass('player-name-2-active');
    } else if (this.currentPlayer.type === 'X') {
        $('#player2').addClass('active');
        $('div .name2 p').addClass('player-name-2-active');
        $('#player1').removeClass('active');
        $('div .name1 p').removeClass('player-name-1-active');
    }
}

Game.prototype.nextPlayer = function() {    
    nextId = this.currentPlayer.id + 1;

    if (typeof this.players[nextId] === 'undefined') {
        nextId = 0;
    }
    this.setCurrentPlayer(this.players[nextId]);

    if(this.currentPlayer.isComputer) {
        setTimeout(this.currentPlayer.markRandomUnmarkedBox(this.getUnmarkedBoxes(), 10000));
        this.checkWinner();
        if (!this.gameWin) {
            this.checkDraw();
        }
        this.nextPlayer();
    }
}

Game.prototype.checkWinner = function() {
    if (typeof this.boxes[0] !== 'undefined' && this.boxes[0] === this.boxes[1] && this.boxes[0] === this.boxes[2]) {
        this.gameWin = true;
    }
    if (typeof this.boxes[3] !== 'undefined' && this.boxes[3] === this.boxes[4] && this.boxes[3] === this.boxes[5]) {
        this.gameWin = true;
    }
    if (typeof this.boxes[6] !== 'undefined' && this.boxes[6] === this.boxes[7] && this.boxes[6] === this.boxes[8]) {
        this.gameWin = true;
    }
    if (typeof this.boxes[0] !== 'undefined' && this.boxes[0] === this.boxes[3] && this.boxes[0] === this.boxes[6]) {
        this.gameWin = true;
    }
    if (typeof this.boxes[1] !== 'undefined' && this.boxes[1] === this.boxes[4] && this.boxes[1] === this.boxes[7]) {
        this.gameWin = true;
    }
    if (typeof this.boxes[2] !== 'undefined' && this.boxes[2] === this.boxes[5] && this.boxes[2] === this.boxes[8]) {
        this.gameWin = true;
    }
    if (typeof this.boxes[0] !== 'undefined' && this.boxes[0] === this.boxes[4] && this.boxes[0] === this.boxes[8]) {
        this.gameWin = true;
    }
    if (typeof this.boxes[2] !== 'undefined' && this.boxes[2] === this.boxes[4] && this.boxes[2] === this.boxes[6]) {
        this.gameWin = true;
    }

    if (this.gameWin) {
        $('#board').hide();
        $('#finish').show();
        $('#finish p').text(`${this.currentPlayer.name} won!`);
        if (this.currentPlayer.type === 'O') {
            $('#finish').addClass('screen-win-one');
        } else if (this.currentPlayer.type === 'X') {
            $('#finish').addClass('screen-win-two');
        }
    }
}

Game.prototype.checkDraw = function() {
    for (let i = 0; i < 9; i++) {
        if (typeof this.boxes[i] === 'undefined') {
            return;
        }
    }

    if (!this.gameWin) {
        $('#board').hide();
        $('#finish').show();
        $('#finish p').text('It\'s a tie!');
        $('#finish').addClass('screen-win-tie');
    }
}

Game.prototype.getUnmarkedBoxes = function() {
    const unmarkedBoxes = [];
    for (let i = 0; i < 9; i++) {
        if (typeof this.boxes[i] === 'undefined') {
            unmarkedBoxes.push(i);
        }
    }
    return unmarkedBoxes;
}
