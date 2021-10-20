// Initiator function that builds all relevant variables and instantiates them appropriately
function init () {

    // Test for local storage support and availability, see storageAvailable comments for more details
    if(storageAvailable('localStorage')) {
        useLocalStorage = true;
    } else {
        useLocalStorage = false;
    }

    isLocalStorageEmpty();


    // Add sample games to library
    sampleGames();

    updateDisplay();

    addEventListenerToModify();

    return;
}

// Add sample games to Library
function sampleGames() {

    Object.create(Game.prototype).initGame('Destiny 2', 'pc', true, 6, 'https://cdn.realsport101.com/images/ncavvykf/gfinityesports/156765e6c912ff3352a5c7e279cb425fb446baa3-1920x1080.jpg', true);
    Object.create(Game.prototype).initGame('Doom Eternal', 'xbox', true, 7, 'http://images.ctfassets.net/rporu91m20dc/3xdOAVjV4Q8CeSmg4UcK4K/5c9eff913b6b2c6c06f667a234e1464e/DOOM_LargeHero_Announce.jpg', false);
    Object.create(Game.prototype).initGame('Monster Hunter: Rise', 'switch', true, 9, 'https://i1.wp.com/mynintendonews.com/wp-content/uploads/2020/09/monster_hunter_rise_logo.jpg', false);
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
let isModify = false;
let modifyTarget;

let useLocalStorage;



// ------------------------------- EventListeners ------------------------------

addSlot.addEventListener('click', () => {
    
    if(menuOpen) {
        return;
    }

    toggleQueryMenu();
});

querySaveButton.addEventListener('click', () => {
    // console.log('You clicked on the querySaveButton');

    if(isModify) {

        let queryResults = readQueryMenu();
        modifyTarget.name = queryResults[0];
        modifyTarget.icon = queryResults[1];
        modifyTarget.owned = queryResults[2];
        modifyTarget.desireToPlay = queryResults[3];
        modifyTarget.beat = queryResults[4];
        modifyTarget.platform = queryResults[5];
        modifyTarget.generateInnerHTML()

        modifyTarget = null;
        isModify = false;
    } else {
        addGameToLibrary(readQueryMenu());
    }

    // Add EventListener to new gameObject's modify button
    addEventListenerToModify();

    toggleQueryMenu();
});

queryDeleteButton.addEventListener('click', () => {
    // console.log('You clicked on the queryDeleteButton');

    if(isModify) {
        // console.log(`You're trying to delete an existing gameObject`);

        let found = myLibrary.findIndex( element => {
            return element == modifyTarget;
        })

        shelf.removeChild(modifyTarget.div);
        
        myLibrary.splice(found, 1);
        
        modifyTarget = null;
        isModify = false
    }

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
    
            // If an existing menu is already open, do not open another menu or change target
            if ( menuOpen ) return;
    
            menuOpen = true;
            isModify = true;
            let index = 0;
            // for...of loop that loops over all nodeTargets of buttonList and compares them to the clicked object. When equal, return the index of the object passed to myLibrary, targeting the clicked button's parent object
                // Alternative method that reads cleaner would be to convert buttonList to an array, then use findIndex on the array, as seen in the queryDeleteButton EventListener above
            for( let nodeTarget of buttonList ) {
                if( nodeTarget === e.target){
                    toggleQueryMenu();
                    break;
                }
                index++;
            }


            updateQueryMenu(myLibrary[index]);
            modifyTarget = myLibrary[index];

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

    let displayName = this.name;
    if(displayName.length >= 19) {
        displayName = displayName.slice(0, 19) + "...";
    }

    this.div.innerHTML = `<div class="platform-icon"> <img src='${platformLink}' alt="${this.platform} Game Platform Logo" class="slot-platform-icon">      </div class="platform-icon">`;
    this.div.innerHTML += `<img src="${this.icon}" alt="${this.name} Video Game Logo" class="slot-icon">`
    this.div.innerHTML += `<b>${displayName}</b> <br>`;
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

    // These could be global constants because they're used by multiple functions
    document.querySelector('#queryMenuName').value = gameObject.name;
    document.querySelector('#queryMenuIcon').value = gameObject.icon;
    document.querySelector('#queryMenuOwned').checked = gameObject.owned;
    document.querySelector('#queryMenuDesire').value = gameObject.desireToPlay;
    document.querySelector('#queryMenuDesire').nextElementSibling.value = gameObject.desireToPlay;
    document.querySelector('#queryMenuBeat').checked = gameObject.beat;

    // Console selector logic
    let queryMenuRadioList = document.querySelectorAll('.queryMenuRadio');
    queryMenuRadioList.forEach(element => {
        element.checked = false;
    });
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


    myLibrary.forEach( e => {
        shelf.appendChild(e.div);
    });

    // return console.log("updateDisplay completed its runtime & hit its return");
    return;

}

// ---------------------------- localStorage ----------------------------

// To do
// Test whether or not the browser can use localStore.
// If you can, test whether or not localStorage is currently populated
// If you cannot, draw up sample objects
// If localStorage is currently populated, localStorage.getItem() on currently stored vales
// Parse the retreieved getItem() values into functional gameObjects, and add them to myLibrary[]
// After all objects have been called from localStorage, CLEAR LOCALSTORAGE BEFORE RE-ADDING VALUES TO PREVENT RECURSIVE ADDING ON EACH PAGE REFRESH
// Add current myLibrary[] values to localStorage

// If you can use localStorage, add new values to localStorage whenever adding, updating, or removing gameObjects

// function that detects whether localStorage is both supported and available:
    // Pulled from link - 
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function isLocalStorageEmpty() {
    console.log("I am isLocalStorageEmpty, I still need functionality implemented here");
    
    if(localStorage.key(0) === null ){
        // yes, instert functionality here
        console.log("localStorage is empty");
    } else {
        // no, insert functionality here
        console.log("localStorage has values, here they are") 
            for ( let i = 0; localStorage.key(i) != null; i++) {
                console.log(`${localStorage.key(i)} : ${localStorage.getItem(localStorage.key(i))}`);
            }
    }
}

localStorage.setItem('test', 'bigger test');
localStorage.setItem('myLibraryLength', myLibrary.length);

// How do I convert myLibrary to a reasonable string
    // Include a myLibrary length value

localStorage.getItem





// Functions for later reference
// Storage.key()
    // When passed a number n, this method will return the name of the nth key in the storage.
// Storage.getItem()
    // When passed a key name, will return that key's value.
// Storage.setItem()
    // When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
// Storage.removeItem()
    // When passed a key name, will remove that key from the storage.
// Storage.clear()
    // When invoked, will empty all keys out of the storage.


init();