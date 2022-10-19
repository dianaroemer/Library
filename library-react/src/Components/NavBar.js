import React, { Component, useState } from 'react';
import '../Styling/Navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faBars } from '@fortawesome/free-solid-svg-icons'

function NavBar(props) {

    const [aboutModal, toggleAboutModal] = useState(false);
    function handleToggleAboutModal(){
        // console.log(`you'd like to toggle the About Modal, which is currently: `, aboutModal);
        toggleAboutModal(!aboutModal);
    }

    function handleAboutClick(e) {
        e.preventDefault();
        handleToggleAboutModal();
    }

    const [optionsModal, toggleOptionsModal] = useState(false);
    function handleToggleOptionsModal(){
        // console.log(`you'd like to toggle the Options Modal, which is currently: `, optionsModal);
        toggleOptionsModal(!optionsModal);
    }

    function handleOptionsClick(e){
        e.preventDefault();
        handleToggleOptionsModal();
    }

    function handleLoadSampleGamesButtonClick(e){
        e.preventDefault();
        console.log(`You clicked the Load Sample Games button! My functionality isn't implemented yet, ah nuuuuuuu broski`);
    }


    return (
        <nav className='navbarContainer' >
            
            <div className='navLeft'>
                D Roemer             
                {/* <img src="images/droemer.png" class="nav-droemer">  */}
                {/* <FontAwesomeIcon icon={faUser} onClick={e=> preventDefault()}/> */}
            </div>
            
            <div className="navTitle">
                Video Game Library
            </div>
            

            <ul>
                <li className="navOptionsToggle" onClick={(e) => {handleOptionsClick(e);}}>Options
                    {optionsModal && 
                        <div className="optionsContainer">
                            <div className="optionsMenu">
                                Options Menu
                                <button id="sampleGames" class="optionsSampleButton"
                                    onClick={(e) => {handleLoadSampleGamesButtonClick(e)}}
                                    >
                                    Load Sample Games?
                                </button>
                            </div>
                        </div>
                    
                    }
                </li>
                <li className="navAboutToggle" onClick={(e)=> {handleAboutClick(e);}}>About
                    {aboutModal && 
                        <div className="aboutContainer">
                            <div className="aboutContent">
                                This project is designed to explore objects and prototyping functionality. Each game is stored as an independant object with inherent values, like name, or a string containing a link to a logo. 
                                In addition, each gameObject has an initGame function that is called from the object's prototype, to save on individual object memory and provide for future scalability.
                                Whenever a new game is initialized, a reference to the object is added to the myLibrary[], which contains references to all active gameObjects. The dynamic functions of the page are all handled via eventListeners that hand-off the app's current state via global variables (bad security practice, I know, but saves on overhead). 
                                Finally, the app also uses a primative localStorage system, in which any changes made to the page on a browser that has localStorage available, are written to localStorage. Whenever the page is initialized, a reader function populates the webpage with any previously existing gameObjects from localStorage, maintaining state across multiple sessions. 
    
                            </div>
                        </div>
                    }



                </li>
                <li className="navPortfolioToggle">
                    <a href="https://github.com/dominicroemer">Portfolio</a>
                </li>
            </ul>

            {/* <img src="images/nav-menu.png" class="nav-menu-icon"> */}

            <FontAwesomeIcon icon={faBars} 
                className="navMenuIcon"
                onClick={e=> e.preventDefault()}/>
            <FontAwesomeIcon icon={faUser} 
                className='navMenuIcon'
                onClick={e=> e.preventDefault()}/>


        </nav>
    )

};

export default NavBar;