// Start Game
// Mole pops up for a random amount of time between TIME_MIN & TIME_MAX
// Amount of moles that can pop up can be between MOLE_AMOUNT_MIN & MOLE_AMOUNT_MAX
// Amount of moles gradually increase in time and amount as hit score goes up?
// If mole is hit score is increased and mole retreats
// If area is hit without mole hammer hp decreases
// If hammer hp is zero game is over and modal pops up
// If hit score is over a certain amount different moles start appearing


const MOLE_TIME_MIN = 1000; //250
const MOLE_TIME_MAX = 1000;
const MOLE_AMOUNT_MIN = 0;
const MOLE_AMOUNT_MAX = 4;

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

$('.molehole').click(function() {
    if(this.classList.contains(".mole")){
        console.log("BONK!");
        scoreIncrease();
    }
    else {
        console.log("BOOP!");
        hammerDecrease();
    }
});


function newGame() {
    console.log("game running");
    console
    //deactive button

    var button = document.getElementById("startGame");
    if(button.classList.contains("button_playing")) {
        button.innerText = "Start Game";
        button.classList.remove("button_playing");

        game_run = false;
    } 
    else {
        button.innerText = "Stop Game";
        button.classList.add("button_playing");

        game_run = true;
        gameRunning();
    }
}

function gameRunning() {
    if(game_run == true) {
        const time = moleTime();
        const hole = moleHole(holes);
        let moley = hole.classList.add('mole');
        // moley.addEventListener("click", moleHit);
        setTimeout(() => {
            hole.classList.remove('mole');
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
}

function hammerDecrease() {
    let hammer_hp = parseInt(document.getElementById("hammer-hp").innerText);    
    document.getElementById("hammer-hp").innerText = --hammer_hp; 

    if(hammer_hp <= 0) {
        document.getElementById("hammer-hp").innerText = 0; // hammer hp has minimum of 0
        modalGameover.show();

        // button.innerText = "Start Game";
        // button.classList.remove("button_playing");

        // game_run = false;
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

