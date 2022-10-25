import React, {useState, useEffect} from 'react'
import '../Styling/QueryMenu.css'

function QueryMenu(props){

const [desireToPlayQueryMenu, setDesireToPlayQueryMenu] = useState(5);
function handleDesireToPlayListener(e){
    e.preventDefault();
    console.log(`You have adjusted the desireToPlaySlider in queryMenu `, e)
    setDesireToPlayQueryMenu(e.target.value)
}

const [queryMenuData, setQueryMenuData] = useState({
  name: "What is this game's name?",
  logo: "Link an image here!",
  owned: false,
  desireToPlay: 5,
  beat: false,
  platform: 'pc'  
})

function handleQueryMenuDataUpdate(e, targetField){
  // console.log(`You're trying to update queryMenuData! Let's make some magic...`);
  console.log(`You're targeting: |`, targetField, `| with a new value of: `, e.target.value)

  // Both owned and beat boolean values need their traditional javascript event scripts to run in order to properly toggle their selected status. In addition, the input-checkbox's value property has no relevance to the active boolean nature of its values; therefore I am manually adjusting the queryMenuData to reflect the appropriate booleans
  if(targetField === 'owned'){
    setQueryMenuData({...queryMenuData,[targetField]: !queryMenuData.owned });  
  } else if (targetField === 'beat'){
    setQueryMenuData({...queryMenuData,[targetField]: !queryMenuData.beat });  
  } else if (targetField === 'platform') {
    // In addition, the platform radio input also needs its traditional javascript event to allow for quick toggling, and therefore does not include e.preventDefault(), but otherwise runs similarly to all other fields.
    setQueryMenuData({...queryMenuData,[targetField]: e.target.value });  
  } else {
    e.preventDefault();
    setQueryMenuData({...queryMenuData,[targetField]: e.target.value });
  }

}

return (

    <div className='queryMenu'>

    <div className='queryMenuContainer'>

      Name: 
      <input className='queryMenuInput' 
        id='queryMenuName'
        value={queryMenuData.name}
        onChange={(e) => handleQueryMenuDataUpdate(e, 'name')}/>
      <br/>

      Logo: 
      <input type='url' 
        className='queryMenuInput'
        id='queryMenuIcon'
        value={queryMenuData.logo}
        onChange={(e) => handleQueryMenuDataUpdate(e, 'logo')}/>
      <br/>

      Owned:
      <input type='checkbox' 
        className='queryMenuCheck'
        id='queryMenuOwned'
        checked={queryMenuData.owned}
        onChange={(e) => handleQueryMenuDataUpdate(e, 'owned')}/>
      <br/>

      Desire to Play:
      <input type='range' min='1' max="10" value={queryMenuData.desireToPlay}
        className='queryMenuSlider'
        onInput={(e) => {
          // e.preventDefault();
          // console.log('you adjusted the desire to play slider')
          // XXXUPDATEXXX Implemenet functionality on changing the state of desire to play here
          handleQueryMenuDataUpdate(e, 'desireToPlay')
          // handleDesireToPlayListener(e);
        }}/>
        <output>{queryMenuData.desireToPlay}</output>
        <br/>

        Did you beat this game?: 
        <input type='checkbox'
          className='queryMenuCheck'
          id='queryMenuBeat'
          checked={queryMenuData.beat}
          onChange={(e) => handleQueryMenuDataUpdate(e, 'beat')}/>
          <br/>

        Console:
        <input type='radio' value='pc' 
          className='queryMenuRadio'
          name='console' defaultChecked
          onChange={(e)=> {
            // console.log(`You selected the PC Console`);
            handleQueryMenuDataUpdate(e, 'platform')
          }}/>
          <label htmlFor='pc'>PC</label>

        <input type='radio' value='ps4' 
          className='queryMenuRadio'
          name='console'
          onChange={(e)=> {
            // console.log(`You selected the PS4 Console`);
            handleQueryMenuDataUpdate(e, 'platform')
          }}/>
          <label htmlFor='ps4'>PS4</label>

        <input type='radio' value='xbox' 
          className='queryMenuRadio'
          name='console'
          onChange={(e)=> {
            // console.log(`You selected the Xbox Console`);
            handleQueryMenuDataUpdate(e, 'platform')
          }}/>
          <label htmlFor='xbox'>Xbox</label>

        <input type='radio' value='switch' 
          className='queryMenuRadio'
          name='console'
          onChange={(e)=> {
            // console.log(`You selected the Switch Console`);
            handleQueryMenuDataUpdate(e, 'platform')
          }}/>
          <label htmlFor='switch'>Switch</label>

          <div className="queryButtons">
              <button className="queryCommitButton" id="querySaveButton"
                onClick={(e) => {props.handleToggleMenu()}}>
                Save
              </button>
              <button className="queryCommitButton" id="queryDeleteButton"
                onClick={(e) => {props.handleToggleMenu()}}>
                Delete 
              </button>
          </div>



    </div>

  </div>



)

}

export default QueryMenu;