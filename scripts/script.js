// Start Game
// Mole pops up for a random amount of time between TIME_MIN & TIME_MAX
// Amount of moles that can pop up can be between MOLE_AMOUNT_MIN & MOLE_AMOUNT_MAX
// Amount of moles gradually increase in time and amount as hit score goes up?
// If mole is hit score is increased and mole retreats
// If area is hit without mole hammer hp decreases
// If hammer hp is zero game is over and modal pops up
// If hit score is over a certain amount different moles start appearing
const MOLE_TIME_MIN = 100;
const MOLE_TIME_MAX = 1000;
const MOLE_AMOUNT_MIN = 0;
const MOLE_AMOUNT_MAX = 4;

// Get the modal
var modal = $('#modalDialog');

// Get the button that opens the modal
var btn = $("#mbtn");

// Get the <span> element that closes the modal
var span = $(".close");

const holes = document.querySelectorAll('.molehole');
let lastHole;

//waits until page is loaded first
$(document).ready(function() {
    console.log("page loaded");
});

function newGame() {
    console.log("game running");
    //deactive button

    const time = moleTime();
    const hole = moleHole(holes);
    hole.classList.add('mole');
    setTimeout(() => {
        hole.classList.remove('mole');
        newGame();
    }, time);
}



function moleTime() {
    return Math.round(Math.random() * (MOLE_TIME_MAX - MOLE_TIME_MIN) + MOLE_TIME_MIN);
}

function moleHole() {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('Ah nah thats the same one bud');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function mole_active() {

}

function gameOver() {

}

// When the user clicks anywhere outside of the modal, close it
$('body').bind('click', function(e){
    if($(e.target).hasClass("modal")){
        modal.fadeOut();
    }
});

/* These are dev functions just to see the scores changing. TO BE REMOVED */
function score() {
    let oldScore = parseInt(document.getElementById("game-score").innerText);    
    document.getElementById("game-score").innerText = ++oldScore; 
}

function hammer() {
    let hammer_hp = parseInt(document.getElementById("hammer-hp").innerText);    
    document.getElementById("hammer-hp").innerText = --hammer_hp; 

    if(hammer_hp <= 0) {
        document.getElementById("hammer-hp").innerText = 0; // hammer hp has minimum of 0
        modal.show();
    }
}