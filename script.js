// Initiator function that builds all relevant variables and instantiates them appropriately
function init () {
    return;
}

// These are the global variables that need to be initiated on the start of every run-time
let myLibrary = [];
const shelf = document.querySelector(`.shelf`);

// -------------------------------- Constructor --------------------------------
// Object constructor to make book objects
const Game = function() {
    let name;
    let platform;
    let owned;
    let desireToPlay;
    let icon;
    let beat;
    let div;
}

Game.prototype.initGame = function(name, platform, owned, desireToPlay, icon, beat, div){
    this.name = name;
    this.platform = platform;
    this.owned = owned;
    this.desireToPlay = desireToPlay;
    this.icon = icon;
    this.beat = beat;
    this.div = div;
    return this;
}

Game.prototype.readState = function() {
    console.log(`Hello! I am ${this.name}. I am on ${this.platform}, I ${this.owned ? 'own' : `don't own`} this game. I have a ${this.desireToPlay}/10 desire to play this game. My icon is ${this.icon}, and I have ${this.beat ? 'beat' : 'not beat'} this game. I have a ${this.div}.`);
    // console.table(this);

    return;
}


// Sample games to fill myLibrary[] for functionality testing AND for default games to load on empty browsers with no localStorage of their own
let destiny = Object.create(Game.prototype).initGame('Destiny 2', 'Steam', true, 8, 'https://cdn.realsport101.com/images/ncavvykf/gfinityesports/156765e6c912ff3352a5c7e279cb425fb446baa3-1920x1080.jpg', true, null);
// destiny.readState();

let doom = Object.create(Game.prototype).initGame('Doom Eternal', 'Steam', true, 9, '.', false, null);
// doom.readState();

let monsterHunter = Object.create(Game.prototype).initGame('Monster Hunter: Rise', 'Switch', true, 9, '.', false, null);
// monsterHunter.readState();

myLibrary[0] = destiny;
myLibrary[1] = doom;
myLibrary[2] = monsterHunter;


// ----------------------------- Library Functions -----------------------------

// This function take's a user's input and stores the new book objects into an array
function addBookToLibrary() {

    // Prompt user details for info about the game
    // let gameName = window.prompt('', '');
    // etc
    // Create the game object in library and append it
    // let gameInstance = Object.create(Game.prototype).initGame(name, platform, owned, desireToPlay, icon, beat, div);
    // myLibrary[myLibrary.length] = gameInstance;

    // For Testing use
    let gameName = "Hearthstone"
    let platform = "Steam"
    let owned = true;
    let desireToPlay = 3;
    let icon = "http://images.ctfassets.net/rporu91m20dc/3xdOAVjV4Q8CeSmg4UcK4K/5c9eff913b6b2c6c06f667a234e1464e/DOOM_LargeHero_Announce.jpg";
    let beat = false;
    let div = document.createElement('div');
    div.setAttribute('class', 'slot');
    div.innerHTML = 'It was me, Barry! It was me the whole time~!' // to be replace with buildHTML's return

    
    let gameInstance = Object.create(Game.prototype).initGame(gameName, platform, owned, desireToPlay, icon, beat, div);

    myLibrary[myLibrary.length] = gameInstance;
    
}

// console.log(myLibrary);

addBookToLibrary();
shelf.appendChild(myLibrary[myLibrary.length -1 ].div);

// console.log(myLibrary);

// console.log(myLibrary[0].readState());
// console.log(myLibrary[3].readState());

// myLibrary[3].div.innerHTML = myLibrary[3].name;

myLibrary[3].div.innerHTML = `<div class="platform-icon">
<img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" alt="Steam Game Platform Logo" class="slot-platform-icon">
</div class="platform-icon">`;
myLibrary[3].div.innerHTML += `<img src="https://cdn.realsport101.com/images/ncavvykf/gfinityesports/156765e6c912ff3352a5c7e279cb425fb446baa3-1920x1080.jpg" alt="Destiny 2 Video Game Logo" class="slot-icon">`
myLibrary[3].div.innerHTML += `${myLibrary[3].name} <br>`;
myLibrary[3].div.innerHTML += `Owned: ${myLibrary[3].owned ? 'Yes' : 'No' } <br>`;
myLibrary[3].div.innerHTML += `Desire to Play: ${myLibrary[3].desireToPlay}/10 <br>`;
myLibrary[3].div.innerHTML += `Beat: ${myLibrary[3].beat ? "True" : "False" } <br>`;
myLibrary[3].div.innerHTML += `<button class="slot-button">Modify</button>`;




function buildHTML (game) {

    // This function takes a game object and builds the correct format of inner HTML to be parsed into a new slot object
    let html;
    // let html = '<div class = "platform-icon"> <br>';
    // html += `<img src="${this.platform}" alt="Steam Game Platform Logo" class="slot-platform-icon"> <br>`;
    // html += `</div> <br>`;
    html += `${game.name} <br>`;


    return html;


//     <div class="platform-icon">
//     <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" alt="Steam Game Platform Logo" class="slot-platform-icon">
// </div>  

// <img src="https://cdn.realsport101.com/images/ncavvykf/gfinityesports/156765e6c912ff3352a5c7e279cb425fb446baa3-1920x1080.jpg" alt="Destiny 2 Video Game Logo" class="slot-icon">
// <br>
// <b>Destiny 2</b>
// <br>
// Owned: Yes
// <br>
// Desire to Play: 7/10
// <br>
// Beat: False
// <br>
// <button class="slot-button">Modify</button>
}






// This function takes the game object and creates a relevant div, attaching it to the object for creation in the DOM
function createGameDiv( game ) {
    


}

// This function loops through myLibrary[] and displays each book on the page.
function updateDisplay() {

    myLibrary.forEach( e => console.log(e));
    return console.log("updateDisplay completed its runtime & hit its return");

}

// console.log(shelf);

// element.appendChild(child);

let div = document.createElement('div');
div.setAttribute('class', `slot`);
// shelf.appendChild(div);
// shelf.removeChild(div);

// div.innerHTML = "What <br>";
// div.innerHTML += "is up <br>";
// div.innerHTML += "my dude";

// div.innerHTML = buildHTML(myLibrary[3]);



let refer = document.getElementsByClassName('slot');
// console.log(refer[0].innerHTML);


// shelf.removeChild(refer[1]);


// myLibrary[0].div = document.createElement('div');
// myLibrary[0].div.setAttribute('class', 'slot');

// shelf.appendChild(myLibrary[0].div);

// myLibrary[0].div.innerHTML = "Quack <br>"
// myLibrary[0].div.innerHTML += "Quackers <br>"

// let refer = document.getElementsByClassName('slot');
// let myReferr = refer[3];


// console.log(myLibrary[0].div.innerHTML);





init();