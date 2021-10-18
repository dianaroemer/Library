// Initiator function that builds all relevant variables and instantiates them appropriately
function init () {

    // queryMenu.style.display = 'block';

    // addBookToLibrary();

    // Add sample games to library
    sampleGames();

    updateDisplay();

    addEventListenerToModify();

    return;
}

// Add sample games to Library
function sampleGames() {

    let destiny = Object.create(Game.prototype).initGame('Destiny 2', 'pc', true, 6, 'https://cdn.realsport101.com/images/ncavvykf/gfinityesports/156765e6c912ff3352a5c7e279cb425fb446baa3-1920x1080.jpg', true);
    let doom = Object.create(Game.prototype).initGame('Doom Eternal', 'xbox', true, 7, 'http://images.ctfassets.net/rporu91m20dc/3xdOAVjV4Q8CeSmg4UcK4K/5c9eff913b6b2c6c06f667a234e1464e/DOOM_LargeHero_Announce.jpg', false);
    let monsterHunter = Object.create(Game.prototype).initGame('Monster Hunter: Rise', 'switch', true, 9, 'https://i1.wp.com/mynintendonews.com/wp-content/uploads/2020/09/monster_hunter_rise_logo.jpg', false);
    Object.create(Game.prototype).initGame('Last of Us 2', 'ps4', true, 8, 'https://media.wired.co.uk/photos/606d9a7ba876dd2203a63a58/master/w_960,c_limit/the-last-of-us-part-2-credit-naughty-dog2000x1270-1.jpg', false);

    // myLibrary[0] = destiny;
    // myLibrary[1] = doom;
    // myLibrary[2] = monsterHunter;

}

// These are the global variables that need to be initiated on the start of every runtime
let myLibrary = [];

const shelf = document.querySelector(`.shelf`);
const addSlot = document.querySelector(`.addSlot`);
const queryMenu = document.querySelector('.queryMenu');
const querySaveButton = document.querySelector('#querySaveButton');
const queryDeleteButton = document.querySelector('#queryDeleteButton');
// menuOpen prevents the user from clicking additional modify buttons or add buttons whenever a queryMenu is already open
let menuOpen = false;



// ------------------------------- EventListeners ------------------------------

addSlot.addEventListener('click', () => {
    toggleQueryMenu();
});

querySaveButton.addEventListener('click', () => {
    // console.log('You clicked on the querySaveButton');

    addGameToLibrary(readQueryMenu());

    // Add EventListener to new gameObject's modify button
    addEventListenerToModify();

    toggleQueryMenu();
});

queryDeleteButton.addEventListener('click', () => {
    console.log('You clicked on the queryDeleteButton');
    // XXXUPDATEXXX Add functionality here
    toggleQueryMenu();
});


// addEventListenerToModify finds all of the current modify buttons and adds a 'click' EventListener that returns the clicked object and opens the queryMenu targeting the clicked object
// This eventListener is set as a function because it will need to be called whenever a new gameObject and subsequent .slot are added, as their new modify elements will need their own eventListeners.
    // This functionality could be changed to be more efficient - instead of adding event listeners to every modifyButton whenever the Library is changed, it could add EventListener's once at init(), and only again when adding a new singular gameObject.
function addEventListenerToModify () {


    let buttonList = document.querySelectorAll('.slot-button');

    buttonList.forEach(element => {
        // console.log(element);
        element.addEventListener('click', ((e) => {
            
            // console.log(e.target);
            
            if ( menuOpen ) return;
    
            let index = 0;
    
            // for...of loop that loops over all nodeTargets of buttonList and compares them to the clicked object. When equal, return the index of the object passed to myLibrary, targeting the clicked button's parent object
            for( let nodeTarget of buttonList ) {
                if( nodeTarget === e.target){
                    console.log(myLibrary[index].name);
                    // XXXUPDATEXXX This function needs to tie in to which button calls it
                    toggleQueryMenu();

                    break;
                }
                index++;
            }
            // console.log(index);


            console.log(`You've clicked on ${myLibrary[index].name} my dude`);

            updateQueryMenu(myLibrary[index]);

            return; 
        }));
    });
}



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

    let displayName;
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

    // Build the div's innerHTML to standardized format
    this.generateInnerHTML();

    myLibrary.push(this);

    return this;
}

Game.prototype.readState = function() {
    console.log(`Hello! I am ${this.name}. I am on ${this.platform}, I ${this.owned ? 'own' : `don't own`} this game. I have a ${this.desireToPlay}/10 desire to play this game. My icon is ${this.icon}, and I have ${this.beat ? 'beat' : 'not beat'} this game. I have a ${this.div}.`);
    // console.table(this);

    return;
}

// This is a helper function for each gameObject that auto-generates the standard format innerHTML according to a standardized preset. This should only be called during initGame and during updateGame (when the modify button is called)
Game.prototype.generateInnerHTML = function() {

    let platformLink;

    switch (this.platform) {
        case "pc":
            platformLink = "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg";
            break;
        case "ps4":
            platformLink = "https://www.playstation.com/etc.clientlibs/global_pdc/clientlibs/clientlib-base/resources/ps-bug.svg";
            break;
        case "xbox":
            platformLink = "https://upload.wikimedia.org/wikipedia/commons/d/d7/Xbox_logo_%282019%29.svg";
            break;
        case "switch":
            platformLink = "https://assets.nintendo.com/image/upload/f_auto,q_auto/Dev/aem-component-demo/switch-logo-large?v=2021092417";
            break;

    }


    this.div.innerHTML = `<div class="platform-icon"> <img src='${platformLink}' alt="${this.platform} Game Platform Logo" class="slot-platform-icon">      </div class="platform-icon">`;
    this.div.innerHTML += `<img src="${this.icon}" alt="${this.name} Video Game Logo" class="slot-icon">`
    this.div.innerHTML += `<b>${this.displayName}</b> <br>`;
    this.div.innerHTML += `Owned: ${this.owned ? 'Yes' : 'No' } <br>`;
    this.div.innerHTML += `Desire to Play: ${this.desireToPlay}/10 <br>`;
    this.div.innerHTML += `Beat: ${this.beat ? "True" : "False" } <br>`;
    this.div.innerHTML += `<button class="slot-button">Modify</button>`;

}


// ----------------------------- Library Functions -----------------------------

// This function take's a user's input and creates new game object, attaches gameInstance to myLibrary[], and appends the game object to shelf.
function addBookToLibrary(  ) {

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


function addGameToLibrary( gameInfo ) {

    // console.log(gameInfo[0]);

    let gameName = gameInfo[0];
    let icon = gameInfo[1];
    let owned = gameInfo[2];
    let desireToPlay = gameInfo[3]
    let beat = gameInfo[4];
    let platform = gameInfo[5];

    // let gameInstance = Object.create(Game.prototype).initGame(gameName, platform, owned, desireToPlay, icon, beat);
    gameInstance = Object.create(Game.prototype).initGame(gameName, platform, owned, desireToPlay, icon, beat);

    updateDisplay();

}


// ---------------------------- queryMenu Functions ----------------------------

// This function toggles the visibility of the queryMenu
function toggleQueryMenu () {

    let queryMenuDisplay = queryMenu.style.display;
    if ( queryMenuDisplay === 'block' ) {
        queryMenu.style.display = 'none'
        menuOpen = false;
    } else {
        queryMenu.style.display = 'block';
        menuOpen = true;
    }

}

function readQueryMenu() {

    let gameName = document.querySelector('#queryMenuName').value;
    let gameIcon = document.querySelector('#queryMenuIcon').value;
    let gameOwned = document.querySelector('#queryMenuOwned').checked;
    let gameDesire = document.querySelector('#queryMenuDesire').value;
    let gameBeat = document.querySelector('#queryMenuBeat').checked;

    let gameConsole;
    // Console identifier
    let consoleList = document.querySelectorAll('.queryMenuRadio');
    consoleList.forEach(element => {
        if(element.checked) {
            gameConsole = element.value;
        }
    })

    // console.log(gameName);
    // console.log(gameIcon);
    // console.log(gameOwned);
    // console.log(gameDesire);
    // console.log(gameBeat);
    // console.log(gameConsole);

    let gameInformation = [gameName, gameIcon, gameOwned, gameDesire, gameBeat, gameConsole];

    return gameInformation;

}

function updateQueryMenu( gameObject ) {

    // console.log(gameObject);

    document.querySelector('#queryMenuName').value = gameObject.name;
    document.querySelector('#queryMenuIcon').value = gameObject.icon;
    document.querySelector('#queryMenuOwned').checked = gameObject.owned;
    document.querySelector('#queryMenuDesire').value = gameObject.desireToPlay;
    document.querySelector('#queryMenuDesire').nextElementSibling.value = gameObject.desireToPlay;
    document.querySelector('#queryMenuBeat').checked = gameObject.beat;

    // Console selector logic
    // console.log(document.querySelectorAll('.queryMenuRadio')[0]);
    // document.querySelectorAll('.queryMenuRadio')[0].checked = false;
    // document.querySelectorAll('.queryMenuRadio')[1].checked = true;

    let queryMenuRadioList = document.querySelectorAll('.queryMenuRadio');
    queryMenuRadioList.forEach(element => {
        element.checked = false;
    });

    console.log(gameObject.platform);

    switch(gameObject.platform) {

        case "pc":
            queryMenuRadioList[0].checked = true;
            break;
        case "ps4":
            queryMenuRadioList[1].checked = true;
            break;
        case "xbox":
            queryMenuRadioList[2].checked = true;
            break;
        case "switch":
            queryMenuRadioList[3].checked = true;
            break;


    };



}




// ---------------------------- Display Functions ----------------------------


// This function loops through myLibrary[] and displays each book on the page.
function updateDisplay() {

    // myLibrary.forEach( e => console.log(e));

    myLibrary.forEach( e => {
        shelf.appendChild(e.div);
    });

    // return console.log("updateDisplay completed its runtime & hit its return");
    return;

}





init();