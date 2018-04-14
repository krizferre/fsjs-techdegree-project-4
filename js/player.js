function Player(id, name, type, isComputer) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.isComputer = isComputer;
}

Player.prototype.markRandomUnmarkedBox = function(unmarkedBoxes) {
    randomBoxIndex = Math.floor(Math.random() * unmarkedBoxes.length);
    randomBox = unmarkedBoxes[randomBoxIndex] + 1;

    if (game.currentPlayer.type === 'O') {
        $(`#box${randomBox}`).addClass('box-filled-1');
    } else if (game.currentPlayer.type === 'X') {
        $(`#box${randomBox}`).addClass('box-filled-2');
    }
    game.boxes[randomBox - 1] = game.currentPlayer.type;
}