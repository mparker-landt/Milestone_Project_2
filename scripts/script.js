// Start Game
// Mole pops up for a random amount of time between TIME_MIN & TIME_MAX
// Amount of moles that can pop up can be between MOLE_AMOUNT_MIN & MOLE_AMOUNT_MAX
// Amount of moles gradually increase in time and amount as hit score goes up?
// If mole is hit score is increased and mole retreats
// If area is hit without mole hammer hp decreases
// If hammer hp is zero game is over and modal pops up
// If hit score is over a certain amount different moles start appearing


const MOLE_TIME_MIN = 750; //250
const MOLE_TIME_MAX = 1250;
const MOLE_AMOUNT_MIN = 0;
const MOLE_AMOUNT_MAX = 4;


var footerActivate = $('#footer-activate');
// var footerContent = $('#footer-content');
var footerContent = document.getElementById('footer-content');
var footerClose = $('#close');

var gameStart = $('#startGame');

// Get the modals
var modalInstructions = $('#modalInstructions');
var modalGameover = $('#modalGameover');

var game_run = false;

const holes = document.querySelectorAll('.molehole');
let lastHole;
const moles = document.querySelector('.mole');
var clicked = false;

//waits until page is loaded first
$(document).ready(function() {
    console.log("page loaded");
});

$('.molehole').click(function(e) {
    if(game_run) {
        if($(e.target).hasClass('mole')) {              // Normal mole hit, score increases
            console.log("BONK!");
            $(e.target).addClass('tap-green');
            setTimeout(function() {
                $(e.target).removeClass('tap-green');
            }, 100);
            $(e.target).removeClass('mole');
            scoreIncrease(1);
        }
        else if($(e.target).hasClass('moleMedic')) {    // Medic mole hit, score and hammer hp increase
            console.log("BONK!");
            $(e.target).addClass('tap-green');
            setTimeout(function() {
                $(e.target).removeClass('tap-green');
            }, 100);
            $(e.target).removeClass('moleMedic');
            scoreIncrease(1);
            hammerIncrease();
        }
        else if($(e.target).hasClass('moleMiner')) {    // Miner mole hit, score increases, hammer hp decreases
            console.log("BONK!");
            $(e.target).addClass('tap-green');
            setTimeout(function() {
                $(e.target).removeClass('tap-green');
            }, 100);
            $(e.target).removeClass('moleMiner');
            scoreIncrease(1);
            hammerDecrease();
        }
        else if($(e.target).hasClass('moleBuff')) {     // Buff mole hit, score increases
            console.log("BONK!");

            if(clicked) {
                $(e.target).addClass('tap-green');
                setTimeout(function() {
                    $(e.target).removeClass('tap-green');
                }, 100);
                $(e.target).removeClass('moleBuff');
                scoreIncrease(2);
            }
            else {
                $(e.target).addClass('tap-grey');
                setTimeout(function() {
                    $(e.target).removeClass('tap-grey');
                }, 100);
                clicked = true;
            }
        }
        else if($(e.target).hasClass('moleGameover')) { // Gameover mole hit, score increases but game over
            console.log("BONK!");
            $(e.target).addClass('tap-green');
            setTimeout(function() {
                $(e.target).removeClass('tap-green');
            }, 100);
            $(e.target).removeClass('moleGameover');
            scoreIncrease(1);
            gameover();
        }
        else {                                          // Molehole hit, hammer hp decreases
            console.log("BOOP!");
            $(e.target).children("div").addClass('tap-red');
            setTimeout(function() {
                $(e.target).children("div").removeClass('tap-red');
            }, 100);
            hammerDecrease();
        }
    }
    else {
        return;
    }
});

function newGame() {
    console.log("game running");
    document.getElementById("hammer-hp").innerText = 3;
    document.getElementById("game-score").innerText = 0; 

    if(gameStart.hasClass("button_playing")) {
        gameStart.removeClass("button_playing").addClass("button_stopped");
        gameStart.text("Start Game");

        game_run = false;
    } 
    else {
        gameStart.removeClass("button_stopped").addClass("button_playing");
        gameStart.text("Stop Game");

        game_run = true;
        gameRunning();
    }
}

function gameRunning() {
    if(game_run) {
        let moleSpeed;
        const hole = moleHole(holes);

        let oldScore = parseInt(document.getElementById("game-score").innerText);
        if(oldScore <= 5) {
            hole.firstChild.classList.add('mole');
            moleSpeed = 1;
        }
        else {
            // let holeArray = [moleHole(holes), moleHole(holes), moleHole(holes)];

            switch(moleChoose()) {
                case 0:
                    hole.firstChild.classList.add('mole');
                    moleSpeed = 1;
                break;
                case 1:
                    hole.firstChild.classList.add('moleMedic');
                    moleSpeed = 0;
                break;
                case 2:
                    hole.firstChild.classList.add('moleMiner');
                    moleSpeed = 0;
                break;
                case 3:
                    hole.firstChild.classList.add('moleBuff');
                    moleSpeed = 2;
                break;
                case 4:
                    hole.firstChild.classList.add('moleGameover');
                    moleSpeed = 2;
                break;
            }
        }
        const time = moleTime(moleSpeed);

        setTimeout(() => {
            hole.firstChild.className = "";
            clicked = false;
            gameRunning();
        }, time); 
    }
    else {
        return;
    }
    
}

function moleTime(speed) {
    let oldScore = parseInt(document.getElementById("game-score").innerText);

    if(oldScore <= 10)
        speed = 2;

    switch(speed) {
        case 0:
            return Math.round(Math.random() * ((MOLE_TIME_MAX - 250) - (MOLE_TIME_MIN - 250)) + (MOLE_TIME_MIN - 250));
        break;

        case 1:
            return Math.round(Math.random() * (MOLE_TIME_MAX - MOLE_TIME_MIN) + MOLE_TIME_MIN);
        break;

        case 2:
            return Math.round(Math.random() * ((MOLE_TIME_MAX + 250) - (MOLE_TIME_MIN + 250)) + (MOLE_TIME_MIN + 250));
        break;
    }

    // if(oldScore <= 10) {
    //     return Math.round(Math.random() * ((MOLE_TIME_MAX + 500) - (MOLE_TIME_MIN + 500)) + (MOLE_TIME_MIN + 500));
    // }
    // else {
    //     return Math.round(Math.random() * (MOLE_TIME_MAX - MOLE_TIME_MIN) + MOLE_TIME_MIN);
    // }
    
}

function moleHole() {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    lastHole = hole;
    return hole;
}

function moleChoose() {
    const mole_character = Math.floor(Math.random() * 5);
    console.log("Mole number chosen = " + mole_character);
    return mole_character;
}

function moleHit(e) {
    if(button.classList.contains("mole"))
    {
        console.log("BONK!");
        score();
    }
}


function scoreIncrease(score) {
    if(score === undefined)
        score = 1;

    let oldScore = parseInt(document.getElementById("game-score").innerText);    
    let newScore = oldScore + score;
    document.getElementById("game-score").innerText = newScore;
    
    $('#score-title').removeClass('border-grey').addClass('border-green');
    setTimeout(function() {
        $('#score-title').removeClass('border-green').addClass('border-grey');
    }, 300);
}

function hammerDecrease() {
    let hammer_hp = parseInt(document.getElementById("hammer-hp").innerText);    
    document.getElementById("hammer-hp").innerText = --hammer_hp; 

    $('#hammer-title').removeClass('border-grey').addClass('border-red');
    setTimeout(function() {
        $('#hammer-title').removeClass('border-red').addClass('border-grey');
    }, 300);

    if(hammer_hp <= 0) {
        gameover();
    }
}

function hammerIncrease() {
    let hammer_hp = parseInt(document.getElementById("hammer-hp").innerText);    
    document.getElementById("hammer-hp").innerText = ++hammer_hp; 

    $('#hammer-title').removeClass('border-grey').addClass('border-green');
    setTimeout(function() {
        $('#hammer-title').removeClass('border-green').addClass('border-grey');
    }, 300);

    if(hammer_hp >= 0) {
        document.getElementById("hammer-hp").innerText = 3; // hammer hp has maximum of 3
    }
}

function gameover() {
    document.getElementById("hammer-hp").innerText = 0; // hammer hp has minimum of 0

    gameStart.removeClass("button_playing").addClass("button_stopped");
    gameStart.text("Start Game");
    game_run = false;

    modalGameover.show();
}

function instructions() {
    modalInstructions.show();
}

function instructionsClose() {
    modalInstructions.fadeOut();
}

function gameoverClose() {
    modalGameover.fadeOut();
}

// When the user clicks anywhere outside of the modal, close it
$('body').bind('click', function(e){
    if($(e.target).hasClass("modal")){
        modalGameover.fadeOut();
        modalInstructions.fadeOut();
    }
});

function toggleFooter() {
    let footerContentState = document.getElementById("footer-content");
    if (footerContentState.style.display === "none") {
        footerContentState.style.display = "block";
    }
    else {
        footerContentState.style.display = "none";
        
    }
}