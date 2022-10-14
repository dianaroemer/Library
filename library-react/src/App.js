import React, { Component, useEffect, useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar';

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

  // const unsub = onSnapshot(doc(db, "testCollection", "timeStamp"), (doc) => {
  //   console.log('Current Data: ', doc.data)
  // })

  // const [unsub, setUnsub] = useState(
  //   () => {
  //     const q = query(collection(db, "testCollection"));
  //     console.log(q);
  //     const us = onSnapshot( q, (querySnap) => {
  //       const messages = [];
  //       querySnap.forEach((doc) => {
  //         messages.push(doc.data().timeStamp);
  //       });
  //       console.log("Current Data in Firestore: ", messages.join(", "));
  //     });
  //     return us;
  //   } 
  // )

  const [data, setData] = useState([]);

  useEffect(() => {
    // const q = query(collection(db, 'testCollection'));
    // console.log(q);

    const coll = collection(db, 'testCollection');
    // console.log(coll);
    const q = query(coll);
    // console.log(q);

    const unsubscribe = onSnapshot(q, (querySnap) => {
      const datum = [];
      querySnap.forEach( (doc) => {
        datum.push(doc.data().timeStamp.seconds);
        setData(datum);
      })
      console.log('Current datum: ', datum);
    })

    return () => unsubscribe();

    // const unsubscribe = onSnapshot(query(collection(db, "testCollection")), (post) => {
      // console.log("Current Data: ", post.docs.data)
    // })
    // return () => unsubscribe();

    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const data = querySnapshot.docs.map(doc => doc.data())
    //   this.setData(data)
    // });
    // return () => unsubscribe();
  }, [])


  const timeRows = []

  data.forEach(element => {
    timeRows.push(
      <div>
        {element}
      </div>
    )
  })


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
      {timeRows}
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
