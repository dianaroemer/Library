import React, { Component, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import './App.css';
import NavBar from './Components/NavBar';
import GameTile from './Components/GameTile';

// import {getFirestore, collection, getDocs, addDoc, serverTimestamp, query } from 'firebase/firestore/lite'
import {doc, onSnapshot, getFirestore, getDocs, addDoc, serverTimestamp, query, collection} from "firebase/firestore"



function App(props) {

  const db = getFirestore(props.firebaseapp);

  async function handleTestButtonClick(e){
    e.preventDefault();
    console.log(`you clicked the test button`);
    try{
      const docRef = await addDoc(collection(db, "testCollection"), {
        firstName: "bugger",
        lastName: "everything",
        year: 2022,
        timeStamp: serverTimestamp()
      });
      console.log('Document written with id: ', docRef.id);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  // const querySnapshot = await getDocs(collection(db, 'testCollection'));

  const [querySnapshot, setQuerySnapshot] = useState(
    async () => {await getDocs(collection(db, "testCollection"))}
  );

  function handleTestButtonClick1(e){
    e.preventDefault();
    getTestCollection(db);
  }

  async function getTestCollection(db){
    const testCol = collection(db, 'testCollection');
    const testSnapshot = await getDocs(testCol);
    const contentList = testSnapshot.docs.map(doc => doc.data());
    console.log(contentList);
    contentList.forEach( (doc) => {
      console.log(doc.timeStamp);
    })
    return contentList;
  }


  // Init the shelf that stores game objects and data
  const [shelfData, setShelfData] = useState([]);
  // Init the snapshot keeping the front-end up to date with the server's databse
  useEffect(() => {
    const q = query(collection(db, 'shelf'));
    const unsubscribe = onSnapshot(q, (qSnapshot) => {
      const datums = [];
      qSnapshot.forEach( (doc) => {
        datums.push({
          data: doc.data(),
          key: uniqid()});
        setShelfData(datums);
      })
      console.log(`Current Shelf Data: `, datums);
    })
    return () => unsubscribe();
  }, [db])


  function handleShelfData(e){
    e.preventDefault();
    console.log(shelfData);
  }

  const myLibrary = [];

  shelfData.forEach(element => {
    const tile = <GameTile gameData={element.data} key={element.key}/>

    myLibrary.push(tile)


  })

  const [desireToPlayQueryMenu, setDesireToPlayQueryMenu] = useState(5);
  function handleDesireToPlayListener(e){
    e.preventDefault();
    console.log(`You have adjusted the desireToPlaySlider in queryMenu `, e)
    setDesireToPlayQueryMenu(e.target.value)
  }




  return (
    <div className="App">
      <NavBar/>

      {/* This is the test button div, set to not display, but easily toggled visibility if I need to access these buttons */}
      <div className='devTestButtons' style={{display: 'none'}}>
        Shiiiyeeet
        <button onClick={(e) => {
          handleTestButtonClick(e);
        }}>test button</button>
        <button onClick={(e) => {
          handleTestButtonClick1(e);
        }}>test button 1</button>
        <button onClick={(e) => {
        handleShelfData(e);
      }}>log shelf data</button>
      </div>



      <div className='shelf'>

        {myLibrary}

      </div>

      <button className='addSlot'
        onClick={(e) => {
          e.preventDefault();
          console.log('You clicked the addSlot button');
        }}> + </button>

      <div className='queryMenu'>

        <div className='queryMenuContainer'>

          Name: 
          <input className='queryMenuInput' 
            value="What is this game's name?"
            id='queryMenuName'/>
          <br/>

          Logo: 
          <input type='url' 
            className='queryMenuInput'
            value="Link an image here!"
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
              <label for="pc">PC</label>

            <input type='radio' value='ps4' 
              className='queryMnuRadio'
              name='console'/>
              <label for="pc">PS4</label>

            <input type='radio' value='xbox' 
              className='queryMnuRadio'
              name='console'/>
              <label for="pc">Xbox</label>

            <input type='radio' value='switch' 
              className='queryMnuRadio'
              name='console'/>
              <label for="pc">Switch</label>

              <div className="queryButtons">
                  <button className="queryCommitButton" id="querySaveButton"> Save </button>
                  <button className="queryCommitButton" id="queryDeleteButton"> Delete </button>
              </div>



        </div>

      </div>



      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
