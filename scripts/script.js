// Start Game
// Mole pops up for a random amount of time between TIME_MIN & TIME_MAX
// Amount of moles that can pop up can be between MOLE_AMOUNT_MIN & MOLE_AMOUNT_MAX
// Amount of moles gradually increase in time and amount as hit score goes up?
// If mole is hit score is increased and mole retreats
// If area is hit without mole hammer hp decreases
// If hammer hp is zero game is over and modal pops up
// If hit score is over a certain amount different moles start appearing


const MOLE_TIME_MIN = 500; //250
const MOLE_TIME_MAX = 1500;
const MOLE_AMOUNT_MIN = 0;
const MOLE_AMOUNT_MAX = 4;

var gameStart = $('#startGame');

// Get the modals
var modalInstructions = $('#modalInstructions');
var modalGameover = $('#modalGameover');

var game_run = false;

const holes = document.querySelectorAll('.molehole');
let lastHole;
const moles = document.querySelector('.mole');

//waits until page is loaded first
$(document).ready(function() {
    console.log("page loaded");
});

$('.molehole').click(function(e) {
    if(game_run) {
        if($(e.target).hasClass('mole')) {
            console.log("BONK!");
            $(e.target).addClass('tap-green');
            setTimeout(function() {
                $(e.target).removeClass('tap-green');
            }, 100);
            $(e.target).removeClass('mole');
            scoreIncrease();
        }
        else {
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
        const time = moleTime();
        const hole = moleHole(holes);
        // let moley = hole.classList.add('mole');
        hole.firstChild.classList.add('mole');
        // moley.addEventListener("click", moleHit);
        setTimeout(() => {
            hole.firstChild.classList.remove('mole');
            gameRunning();
        }, time); 
    }
    else {
        return;
    }
    
}

function moleTime() {
    return Math.round(Math.random() * (MOLE_TIME_MAX - MOLE_TIME_MIN) + MOLE_TIME_MIN);
}

function moleHole() {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    lastHole = hole;
    return hole;
}

function moleHit(e) {
    if(button.classList.contains("mole"))
    {
        console.log("BONK!");
        score();
    }
}


function scoreIncrease() {
    let oldScore = parseInt(document.getElementById("game-score").innerText);    
    document.getElementById("game-score").innerText = ++oldScore;
    
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
        document.getElementById("hammer-hp").innerText = 0; // hammer hp has minimum of 0
        modalGameover.show();

        gameStart.removeClass("button_playing").addClass("button_stopped");
        gameStart.text("Start Game");
        game_run = false;
    }
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

