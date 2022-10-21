import React, {useState, useEffect} from 'react'
import '../Styling/QueryMenu.css'

function QueryMenu(props){

const [desireToPlayQueryMenu, setDesireToPlayQueryMenu] = useState(5);
function handleDesireToPlayListener(e){
    e.preventDefault();
    console.log(`You have adjusted the desireToPlaySlider in queryMenu `, e)
    setDesireToPlayQueryMenu(e.target.value)
}

return (

    <div className='queryMenu'>

    <div className='queryMenuContainer'>

      Name: 
      <input className='queryMenuInput' 
        defaultValue="What is this game's name?"
        id='queryMenuName'/>
      <br/>

      Logo: 
      <input type='url' 
        className='queryMenuInput'
        defaultValue="Link an image here!"
        id='queryMenuIcon'/>
      <br/>

      Owned:
      <input type='checkbox' 
        className='queryMenuCheck'
        id='queryMenuOwned'/>
      <br/>

      Desire to Play:
      <input type='range' min='1' max="10" value={desireToPlayQueryMenu}
        className='queryMenuSlider'
        onInput={(e) => {
          // e.preventDefault();
          // console.log('you adjusted the desire to play slider')
          handleDesireToPlayListener(e);
        }}/>
        <output>{desireToPlayQueryMenu}</output>
        <br/>

        Did you beat this game?: 
        <input type='checkbox'
          className='queryMenuCheck'
          id='queryMenuBeat'/>
        <br/>

        Console:
        <input type='radio' value='pc' 
          className='queryMnuRadio'
          name='console' defaultChecked/>
          <label htmlFor='pc'>PC</label>

        <input type='radio' value='ps4' 
          className='queryMnuRadio'
          name='console'/>
          <label htmlFor='pc'>PS4</label>

        <input type='radio' value='xbox' 
          className='queryMnuRadio'
          name='console'/>
          <label htmlFor='pc'>Xbox</label>

        <input type='radio' value='switch' 
          className='queryMnuRadio'
          name='console'/>
          <label htmlFor='pc'>Switch</label>

          <div className="queryButtons">
              <button className="queryCommitButton" id="querySaveButton"> Save </button>
              <button className="queryCommitButton" id="queryDeleteButton"> Delete </button>
          </div>



    </div>

  </div>



)

}

export default QueryMenu;