import React, { Component, useEffect, useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar';

import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite'



function App(props) {

  const db = getFirestore(props.firebaseapp);

  async function handleTestButtonClick(e){
    e.preventDefault();
    console.log(`you clicked the test button`);
    try{
      const docRef = await addDoc(collection(db, "testCollection"), {
        firstName: "bugger",
        lastName: "everything",
        year: 2022
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
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });
    // console.log(querySnapshot);
    // console.log(getTestCollection(db));
    const newVals = getTestCollection(db);
    console.log(newVals);

    

  }

  async function getTestCollection(db){
    const testCol = collection(db, 'testCollection');
    const testSnapshot = await getDocs(testCol);
    const contentList = testSnapshot.docs.map(doc => doc.data());
    return contentList;
  }

  // async function establishQuerySnapshot(){

  //   setQuerySnapshot(await getDocs(collection(db, "testCollection")))
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });

  // }

  // useEffect( () => {
  //   establishQuerySnapshot();
  // }, [])

  // establishQuerySnapshot();


  return (
    <div className="App">
      <NavBar/>
      <div>
        Shiiiyeeet
        <button onClick={(e) => {
          handleTestButtonClick(e);
        }}>test button</button>
        <button onClick={(e) => {
          handleTestButtonClick1(e);
        }}>test button 1</button>
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
