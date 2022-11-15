import React, {useEffect, useState } from 'react';
import uniqid from 'uniqid';
import './App.css';
import NavBar from './Components/NavBar';
import GameTile from './Components/GameTile';
import QueryMenu from './Components/QueryMenu';

// import {getFirestore, collection, getDocs, addDoc, serverTimestamp, query } from 'firebase/firestore/lite'
import {onSnapshot, getFirestore, addDoc, query, collection, setDoc, deleteDoc} from "firebase/firestore"



function App(props) {

  const db = getFirestore(props.firebaseapp);

  // async function handleTestButtonClick(e){
  //   e.preventDefault();
  //   console.log(`you clicked the test button`);
  //   try{
  //     const docRef = await addDoc(collection(db, "testCollection"), {
  //       firstName: "bugger",
  //       lastName: "everything",
  //       year: 2022,
  //       timeStamp: serverTimestamp()
  //     });
  //     console.log('Document written with id: ', docRef.id);
  //   } catch (e) {
  //     console.log("Error adding document: ", e);
  //   }
  // }

  // const [querySnapshot, setQuerySnapshot] = useState(
  //   async () => {await getDocs(collection(db, "testCollection"))}
  // );

  // function handleTestButtonClick1(e){
  //   e.preventDefault();
  //   getTestCollection(db);
  // }

  // async function getTestCollection(db){
  //   const testCol = collection(db, 'testCollection');
  //   const testSnapshot = await getDocs(testCol);
  //   const contentList = testSnapshot.docs.map(doc => doc.data());
  //   console.log(contentList);
  //   contentList.forEach( (doc) => {
  //     console.log(doc.timeStamp);
  //   })
  //   return contentList;
  // }


  // Init the shelf that stores game objects and data
  const [shelfData, setShelfData] = useState([]);
  // Init the snapshot keeping the front-end up to date with the server's databse
  useEffect(() => {
    const q = query(collection(db, 'shelf'));
    const unsubscribe = onSnapshot(q, (qSnapshot) => {
      const datums = [];
      qSnapshot.forEach( (doc) => {
        // console.log(doc)
        datums.push({
          data: doc.data(),
          key: uniqid(),
          docRef: doc.ref})
          // docRef: doc(db, 'shelf', doc.id)});
        setShelfData(datums);
      })
      // console.log(`Current Shelf Data: `, datums);
    })
    return () => unsubscribe();
  }, [db])



  const myLibrary = [];
  shelfData.forEach(element => {
    const tile = <GameTile gameData={element.data} 
                    key={element.key}
                    docRef={element.docRef}
                    handleClickModify={handleClickModify}/>
                    // console.log(tile);
                    myLibrary.push(tile);
  })



  // ------------------ queryMenu toggles and functionality ------------------

  const [menuOpen, toggleMenuOpen] = useState(false);
  function handleToggleMenu(){
    // console.log(`You're trying to toggle queryMenu!`);
    if(!menuOpen){
      // console.log(`queryMenu is currently not open, Opening a new queryMenu...`);
      // DO THE THING TO OPEN THE MENU, something something show menuOpen
      toggleMenuOpen(true);
    } else {
      // console.log(`queryMenu is already open! Closing queryMenu...`)
      toggleMenuOpen(false);
    }
  }

  function handleClickMenuOpen(e){
    e.preventDefault();
    // console.log(`You clicked a button to open queryMenu. Checking queryMenu's state...`)
    if(!menuOpen){
      // console.log(`queryMenu is currently closed! Opening queryMenu`);
      handleQueryMenuGameUpdate(null, null);
      handleToggleMenu()
    } else {
      // console.log(`queryMenu is already open! I can do nothing until the currently existing queryMenu has been closed!`);
    }
  }

  function handleClickModify(e, gameData, docRef){
    e.preventDefault();
    // console.log(`You are opening the queryMenu on an existing GameTile!`);
    if(!menuOpen){
      // console.log(`Its data is: `, gameData, docRef);
      // console.log(`queryMenu is currently closed! Opening queryMenu`);
      handleQueryMenuGameUpdate(gameData, docRef);
      handleToggleMenu()
    } else {
      // console.log(`queryMenu is already open! I can do nothing until the currently existing queryMenu has been closed!`);
    }
  }

  async function addNewDoc(e, queryMenuData) {
    e.preventDefault();
    // console.log("You're trying to add a new doc. Its data is: ", queryMenuData);
    // console.log('Trying to write new data to collection...');
    const docRef = await addDoc(collection(db, "shelf"), queryMenuData);
    console.log('Document written with ID: ', docRef.id);

  }



  const [queryMenuGameData, setQueryMenuGameData] = useState(null);
  const [queryMenuGameRef, setQueryMenuGameRef] = useState(null);
  // When this function is called with null in gameData and docRef, the queryMenu opens in its default state, whereas when this function is passed gameData and a gameRef from a Modify onClick, it updates queryMenu to use the new values of the targeted click
  function handleQueryMenuGameUpdate(gameData, docRef){
    gameData ? setQueryMenuGameData(gameData) : setQueryMenuGameData(null);
    docRef ? setQueryMenuGameRef(docRef) : setQueryMenuGameRef(null);
  }

  async function deleteGameTile(e, gameData, gameRef){
    e.preventDefault();
    // console.log(`Do the thing to delete this GameTile`);
    // console.log(`The current data trying to be deleted is: `, gameData, gameRef);
    await deleteDoc(gameRef);
  }

  async function updateGameTile(e, gameData, gameRef){
    e.preventDefault();
    // console.log(`Do the thing to update the existing game within the firebase`)
    // console.log(`New data is: `, gameData, gameRef)
    
    
    await setDoc(gameRef, gameData, {merge : true});
  }


    // ------------------ login and logout functionliaty ------------------

    // const [isLoggedIn, toggleIsLoggedIn] = useState(false);
    // function handleToggleIsLoggedIn() {
    //   console.log(`You're trying to toggle the current logged in status!`);
    // }


  return (
    <div className="App">
      <NavBar/>

      {/* This is the test button div, set to not display, but easily toggled visibility if I need to access these buttons */}
      {/* <div className='devTestButtons' style={{display: 'none'}}>
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
      </div> */}


      <div className='shelf'>
        {myLibrary}
      </div>


      <button className='addSlot'
        onClick={(e) => {
          handleClickMenuOpen(e);
        }}> + </button>


      {menuOpen && <QueryMenu 
        handleToggleMenu={handleToggleMenu}
        addNewDoc={addNewDoc}
        queryMenuGameData={queryMenuGameData}
        queryMenuGameRef={queryMenuGameRef}
        deleteGameTile={deleteGameTile}
        updateGameTile={updateGameTile}/>}


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

// function App(props) {
//   return (
//     <div>
//       <NavBar/>

//       Shit goes here, ayy
//       <br/>

//       Links to include:
//       <ul>
//         <li>
//           Intro/Landing Page
//         </li>
//         <li>
//           About Me
//         </li>
//         <li>
//           Portfolio and Samples
//         </li>
//         <li>
//           Skills and Blog (With search and tag system?)
//         </li>
//         <li>
//           Contact/Hire Me
//         </li>
//         <li>
//           Developer dashboard for adding new content to (Portfolio and Samples) and (Skills and Blog)? This is optional after the rest of the content has been implemented
//         </li>
//       </ul>

//       Basic Content layouts
//       <ul>
//         <li>
//           <b>About Me</b>
//           <div>
//             Content goes here
//           </div>
//         </li>
//         <li>
//           <b>Portfolio and Samples</b>
//           <div>
//             Content goes here
//             <ul>
//               <li>I worked on this thing?</li>
//             </ul>
//           </div>
//         </li>
//         <li>
        
//         <b>Skills and Blog</b>

//           <div>
//             Content posts about my most recent skills goes into this section
//             <div><br/></div>
//             <ul>
//               <li>
//                 Async/Await and Back End as a Service (Google Firebase with Cloud Firestore, Firebase Storage, and Google Analytics)
//                 <div>Project - Library (rebuilt an earlier portfolio project using React for Firebase functionality)</div>
//               </li>
//             </ul>
//             <ul>
//               <li>
//                 ReactRouter, Responsive mobile-first web design(and first app for consumer use)
//                 <div>Project - Thirteenth Understanding (Large scale personal project)</div>
//               </li>
//             </ul>
//             <ul>
//               <li>
//                 ReactJS
//                 <div>Project - CV Application(Hooks (useState, useEffect), Object Components, State Management)</div>
//                 <div>Project- Memorization Card Game</div>
//               </li>
//             </ul>
//             <br/>
//           </div>
//         </li>
//         <li>
//         Contact and Hire Me
//           <div>
//             Content information and other goodies goes here, this should be a pretty straightforward page to implement
//           </div>
//         </li>
//       </ul>

//     </div>

//   )
// }


export default App;
