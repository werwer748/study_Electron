import React from "react";
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import Login from "./Login";
import Signup from "./Signup";
import Rooms from "./Rooms";
import Room from "./Room";

//Routing 정의
const appRouting = (
    <Router history={hashHistory}>
        <Route path="/">
            <Route path="login" component={Login} />
            <Route path="signup" component={Signup} />
            <Route path="rooms" component={Rooms} >
                <Route path=":roomId" component={Room} />
            </Route>
        </Route>
    </Router>
);

//Routing 초기화
if (!location.hash.length) {
    location.hash = "#/login";
}

//firebase 초기화하기

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdfrfRpkajKCAb0n02AsZvV3DRrMwhN-Y",
  authDomain: "electron-chat-fa35c.firebaseapp.com",
  projectId: "electron-chat-fa35c",
  storageBucket: "electron-chat-fa35c.appspot.com",
  messagingSenderId: "423236895934",
  appId: "1:423236895934:web:21bce9c9c4e53d0ee74aef",
  measurementId: "G-7XDWT35DN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Application 렌더링
render(appRouting, document.getElementById("app"));