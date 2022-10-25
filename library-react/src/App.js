import React, { Component, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import './App.css';
import NavBar from './Components/NavBar';
import GameTile from './Components/GameTile';
import QueryMenu from './Components/QueryMenu';

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

  // const [querySnapshot, setQuerySnapshot] = useState(
  //   async () => {await getDocs(collection(db, "testCollection"))}
  // );

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
    const tile = <GameTile gameData={element.data} 
                    key={element.key}
                    handleClickModify={handleClickMenuOpen}/>

    myLibrary.push(tile)


  })

  const [menuOpen, toggleMenuOpen] = useState(false);
  function handleToggleMenu(){
    console.log(`You're trying to open a menu!`);
    if(!menuOpen){
      console.log(`queryMenu is currently not open, Opening a new menu...`);
      // DO THE THING TO OPEN THE MENU, something something show menuOpen
      toggleMenuOpen(true);
    } else {
      console.log(`queryMenu is already open! Closing queryMenu...`)
      toggleMenuOpen(false);
    }
  }

  function handleClickMenuOpen(e){
    e.preventDefault();
    console.log(`You clicked a button to open queryMenu. Checking queryMenu's state...`)
    if(!menuOpen){
      console.log(`queryMenu is currently closed! Opening queryMenu`);
      handleToggleMenu()
    } else {
      console.log(`queryMenu is already open! I can do nothing until the currently existing queryMenu has been closed!`);
    }

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
          handleClickMenuOpen(e);
        }}> + </button>


      {menuOpen && <QueryMenu handleToggleMenu={handleToggleMenu}/>}


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
