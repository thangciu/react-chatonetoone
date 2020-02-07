import React from "react";
import ReactDOM from "react-dom";

import "index.scss";
import Main from "./components/main";
// import * as firebase from 'firebase';
// var app = firebase.initializeApp({
//     apiKey: "AIzaSyDzbRIisWqR-LUQ6JJEp4CbL1kOYXkRzFs",
//     authDomain: "ci30-5acdf.firebaseapp.com",
//     databaseURL: "https://ci30-5acdf.firebaseio.com",
//     projectId: "ci30-5acdf",
//     storageBucket: "",
//     messagingSenderId: "687547911232",
//     appId: "1:687547911232:web:b9d2cf18e3f4f3cd73e3a5"
//  });
//  console.log('app', app)

ReactDOM.render(
  <Main />,

  document.getElementById("root")
);
