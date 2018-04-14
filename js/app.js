// global variables
let game;
let player1;
let player2;
let name1;
let name2;

const boxNotFilled = () => {
    return !$(event.target).hasClass('box-filled-1') && !$(event.target).hasClass('box-filled-2');
}

const addEvents = () => {
    $('#start .button').on('click', () => {
        startGame();
    });

    $('.box').on('click', (event) => {
        if (boxNotFilled() && !game.currentPlayer.isComputer) {
            if (game.currentPlayer.type === 'O') {
                $(event.target).addClass('box-filled-1');
            } else if (game.currentPlayer.type === 'X') {
                $(event.target).addClass('box-filled-2');
            }
            boxId = parseInt(event.target.id.slice(3));
            game.boxes[boxId - 1] = game.currentPlayer.type;
    
            game.checkWinner();
            if (!this.gameWin) {
                game.checkDraw();
            }

            if (!game.gameWin && !game.gameDraw) {
                game.nextPlayer();
            }
        }
    });

    $('.box').hover(        
        (event) => {
            if (boxNotFilled()) {
                type = game.currentPlayer.type.toLowerCase();
                $(event.target).css('background-image', `url(img/${type}.svg)`);
            }
        },
        (event) => {
            $(event.target).css('background-image', '');
        },
    );

    $('#finish .button').on('click', () => {
        initializeGame();       
        startGame(); 
    });
}

const initializeGame = () => {
    $('#finish').removeClass('screen-win-one');
    $('#finish').removeClass('screen-win-two');    
    $('#finish').removeClass('screen-win-tie');    
    $('.box').removeClass('box-filled-1');
    $('.box').removeClass('box-filled-2');
    $('#start').show();    
    $('#board').hide();
    $('#finish').hide();
}

const startGame = () => {
    game = new Game();

    name1 = prompt(`Please enter name of 'O' player.`, `Player 1`);
    isComputer1 = false;
    name1 = name1 ? name1 : 'Player 1';
    $('.player-name-1').text(name1);

    name2 = prompt(`Please enter name of 'X' player.`, `Player 2`);
    isComputerPrompt2 = prompt('Is this player 2 computer? (Y/N)', 'N'); 
    if (isComputerPrompt2 == null || isComputerPrompt2.toUpperCase() !== 'Y') {
        isComputer2 = false;
    } else {
        isComputer2 = true;
    }

    name2 = name2 ? name2 : 'Player 2';
    $('.player-name-2').text(name2);

    player1 = new Player(0, name1, 'O', isComputer1);
    player2 = new Player(1, name2, 'X', isComputer2);
    game.addPlayer(player1);
    game.addPlayer(player2);
    game.chooseRandomStartPlayer();
    $('#start').hide();
    $('#board').show();

    if(game.currentPlayer.isComputer) {
        game.currentPlayer.markRandomUnmarkedBox(game.getUnmarkedBoxes());
        game.nextPlayer();
    }

}

$(document).on('DOMContentLoaded', () => {
    addEvents();
    initializeGame();
});