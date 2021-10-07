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
    let platform;
    let owned;
    let desireToPlay;
    let icon;
    let beat;
}

Game.prototype.init = function(name, platform, owned, desireToPlay, icon, beat){
    this.name = name;
    this.platform = platform;
    this.owned = owned;
    this.desireToPlay = desireToPlay;
    this.icon = icon;
    this.beat = beat;
    return this;
}

Game.prototype.readState = function() {
    console.log(`Hello! I am ${this.name}. I am on ${this.platform}, I ${this.owned ? 'own' : `don't own`} this game. I have a ${this.desireToPlay}/10 desire to play this game. My icon is ${this.icon}, and I have ${this.beat ? 'beat' : 'not beat'} this game.`);
    console.table(this);
}


// Sample games to fill myLibrary[] for functionality testing AND for default games to load on empty browsers with no localStorage of their own
let destiny = Object.create(Game.prototype).init('Destiny 2', 'Steam', true, 8, 'https://cdn.realsport101.com/images/ncavvykf/gfinityesports/156765e6c912ff3352a5c7e279cb425fb446baa3-1920x1080.jpg', true);
destiny.readState();

let doom = Object.create(Game.prototype).init('Doom Eternal', 'Steam', true, 9, '.', false);
doom.readState();

let monsterHunter = Object.create(Game.prototype).init('Monster Hunter: Rise', 'Switch', true, 9, '.', false);
monsterHunter.readState();

myLibrary[0] = destiny;
myLibrary[1] = doom;
myLibrary[2] = monsterHunter;


updateDisplay();


// ----------------------------- Library Functions -----------------------------

// This function take's a user's input and stores the new book objects into an array
function addBookToLibrary() {




}

function createGameElement( game ) {
    


}

// This function loops through myLibrary[] and displays each book on the page.
function updateDisplay() {

    myLibrary.forEach( e => console.log(e));
    return console.log("updateDisplay completed its runtime & hit its return");

}





init();