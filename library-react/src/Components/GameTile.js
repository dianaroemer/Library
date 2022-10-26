import React from 'react'
import '../Styling/GameTile.css'

function GameTile(props) {

    


    return(

        <div className='slot'>

            <div className='platform-icon'>
                <img className='slot-platform-icon' 
                    alt={(()=> {
                        switch(props.gameData.platform){
                            case 'ps4':
                                return 'PS4 Game Platform Logo'
                            case 'xbox':
                                return 'Xbox Game Platform Logo'
                            case 'switch':
                                return 'Nintendo Switch Game Platform Logo'
                            case 'pc':
                                return 'PC Game Platform Logo'
                            default:
                                return 'Game Platform Logo'
                        }
                    })()}
                
                    src={(() => {
                        switch(props.gameData.platform){
                            case 'ps4':
                                return 'https://www.playstation.com/etc.clientlibs/global_pdc/clientlibs/clientlib-base/resources/ps-bug.svg'
                            case 'xbox':
                                return 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Xbox_logo_%282019%29.svg'
                            case 'switch':
                                return 'https://assets.nintendo.com/image/upload/f_auto,q_auto/Dev/aem-component-demo/switch-logo-large?v=2021092417'
                            case 'pc':
                                return 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg'
                            default: 
                                return '';
                        }
                    })()}/>
            </div>

            <img src={props.gameData.icon} 
                alt={props.gameData.name + ' Video Game Logo'}
                className='slot-icon'/>
            
            <b>{props.gameData.name}</b>
            <br/>
            Owned: { props.gameData.owned ? 'Yes ' : 'No '}
            <br/>
            Desire to Play: {props.gameData.desireToPlay + "/10"}
            <br/>
            Beat: {props.gameData.beat ? "True " : "False "}
            <br/>
            <button className='slot-button' 
                onClick={(e) => props.handleClickModify(e, props.gameData, props.docRef)}>
                    Modify
                </button>

        </div>

    )
}

export default GameTile;