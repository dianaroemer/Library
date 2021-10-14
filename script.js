// Initiator function that builds all relevant variables and instantiates them appropriately
function init () {

    // queryMenu.style.display = 'block';

    return;
}

// These are the global variables that need to be initiated on the start of every run-time
let myLibrary = [];
const shelf = document.querySelector(`.shelf`);

const addSlot = document.querySelector(`.addSlot`);
const queryMenu = document.querySelector('.queryMenu');
// menuOpen prevents the user from clicking additional modify buttons or add buttons whenever a queryMenu is already open
let menuOpen = false;
addSlot.addEventListener('click', () => {

    let queryMenuDisplay = queryMenu.style.display;

    if ( queryMenuDisplay === 'block' ) {
        queryMenu.style.display = 'none'
        menuOpen = false;
    } else {
        queryMenu.style.display = 'block';
        menuOpen = true;
    }
    
    // console.log('You clicked the addSlot button');
});





// -------------------------------- Constructor --------------------------------
// Object constructor to make game objects
const Game = function() {
    let name;
    let platform;
    let owned;
    let desireToPlay;
    let icon;
    let beat;
    let div;
}

Game.prototype.initGame = function(name, platform, owned, desireToPlay, icon, beat){
    this.name = name;
    this.platform = platform;
    this.owned = owned;
    this.desireToPlay = desireToPlay;
    this.icon = icon;
    this.beat = beat;
    this.div = document.createElement('div');
    this.div.setAttribute('class', `slot`);

    this.displayName = this.name;

    if(this.name.length >= 19) {
        this.displayName = this.name.slice(0, 19) + "...";
    }

    // this.div.innerHTML = '';

    // Build the div's innerHTML to standardized format
    this.div.innerHTML = `<div class="platform-icon">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" alt="Steam Game Platform Logo" class="slot-platform-icon">
        </div class="platform-icon">`;
    this.div.innerHTML += `<img src="https://cdn.realsport101.com/images/ncavvykf/gfinityesports/156765e6c912ff3352a5c7e279cb425fb446baa3-1920x1080.jpg" alt="Destiny 2 Video Game Logo" class="slot-icon">`
    this.div.innerHTML += `<b>${this.displayName}</b> <br>`;
    this.div.innerHTML += `Owned: ${this.owned ? 'Yes' : 'No' } <br>`;
    this.div.innerHTML += `Desire to Play: ${this.desireToPlay}/10 <br>`;
    this.div.innerHTML += `Beat: ${this.beat ? "True" : "False" } <br>`;
    this.div.innerHTML += `<button class="slot-button">Modify</button>`;


    return this;
}

Game.prototype.readState = function() {
    console.log(`Hello! I am ${this.name}. I am on ${this.platform}, I ${this.owned ? 'own' : `don't own`} this game. I have a ${this.desireToPlay}/10 desire to play this game. My icon is ${this.icon}, and I have ${this.beat ? 'beat' : 'not beat'} this game. I have a ${this.div}.`);
    // console.table(this);

    return;
}


// Sample games to fill myLibrary[] for functionality testing AND for default games to load on empty browsers with no localStorage of their own
let destiny = Object.create(Game.prototype).initGame('Destiny 2', 'Steam', true, 8, 'https://cdn.realsport101.com/images/ncavvykf/gfinityesports/156765e6c912ff3352a5c7e279cb425fb446baa3-1920x1080.jpg', true);
// destiny.readState();

let doom = Object.create(Game.prototype).initGame('Doom Eternal', 'Steam', true, 9, '.', false);
// doom.readState();

let monsterHunter = Object.create(Game.prototype).initGame('Monster Hunter: Rise', 'Switch', true, 9, '.', false);
// monsterHunter.readState();

myLibrary[0] = destiny;
myLibrary[1] = doom;
myLibrary[2] = monsterHunter;


// ----------------------------- Library Functions -----------------------------

// This function take's a user's input and creates new game object, attaches gameInstance to myLibrary[], and appends the game object to shelf.
function addBookToLibrary() {

    // Prompt user details for info about the game
    // let gameName = window.prompt('', '');
    // etc
    // Create the game object in library and append it
    // let gameInstance = Object.create(Game.prototype).initGame(name, platform, owned, desireToPlay, icon, beat, div);
    // myLibrary[myLibrary.length] = gameInstance;



    // For Testing use
    // Instantiate user inputs to variables
    let gameName = "Nutter Butter"
    let platform = "Steam"
    let owned = true;
    let desireToPlay = 3;
    let icon = "http://images.ctfassets.net/rporu91m20dc/3xdOAVjV4Q8CeSmg4UcK4K/5c9eff913b6b2c6c06f667a234e1464e/DOOM_LargeHero_Announce.jpg";
    let beat = false;

    // Instantiate new Game Object via user inputs above
    let gameInstance = Object.create(Game.prototype).initGame(gameName, platform, owned, desireToPlay, icon, beat);

    // Add reference to gameInstance to myLibrary for later read, update, destroy functions
    myLibrary[myLibrary.length] = gameInstance;

    // Add gameInstance to DOM 
    shelf.appendChild(gameInstance.div);
    
}

addBookToLibrary();




// This function loops through myLibrary[] and displays each book on the page.
function updateDisplay() {

    myLibrary.forEach( e => console.log(e));
    return console.log("updateDisplay completed its runtime & hit its return");

}


let sample = document.querySelectorAll('.slot-button');


sample.forEach(element => {
    // console.log(element);
    element.addEventListener('click', ((e) => {
        // console.log(e.target);

        if ( menuOpen) return;

        let index = 0;

        // for...of loop that loops over all nodeTargets of sample and compares them to the clicked object. When equal, return the index of the object passed to myLibrary, targeting the clicked button's parent object
        for( let nodeTarget of sample ) {
            if( nodeTarget === e.target){
                console.log(myLibrary[index].name);
                return;
            }
            index++;
        }
        console.log(index);
    }));
});


init();