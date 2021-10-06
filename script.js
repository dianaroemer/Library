// Initiator function that builds all relevant variables and instantiates them appropriately
function init () {
    return;
}

// These are the global variables that need to be initiated on the start of every run-time
let myLibrary = [];

// -------------------------------- Constructor --------------------------------
// Object constructor to make book objects
const Game = function() {
    let name;
    let played;
}

Game.prototype.init = function(name, played) {
    this.name = name;
    this.played = played;
    return this;
}

Game.prototype.readState = function() {
    console.log(`Hello! I am ${this.name}, and I have ${this.played ? '' : 'not '}played this game.`);
}

let destiny = Object.create(Game.prototype).init('Destiny 2', true);
destiny.readState();

let doom = Object.create(Game.prototype).init('Doom Eternal', false);
doom.readState();

let monsterHunter = Object.create(Game.prototype).init('Monster Hunter: Rise', false);

myLibrary[0] = destiny;
myLibrary[1] = doom;
myLibrary[2] = monsterHunter;


updateDisplay();


// ----------------------------- Library Functions -----------------------------

// This function take's a user's input and stores the new book objects into an array
function addBookToLibrary() {




}

// This function loops through myLibrary[] and displays each book on the page.
function updateDisplay() {

    myLibrary.forEach( e => console.log(e));
    return console.log("updateDisplay completed its runtime & hit its return");

}





init();