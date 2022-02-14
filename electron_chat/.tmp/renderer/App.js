'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _app = require('firebase/app');

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _Signup = require('./Signup');

var _Signup2 = _interopRequireDefault(_Signup);

var _Rooms = require('./Rooms');

var _Rooms2 = _interopRequireDefault(_Rooms);

var _Room = require('./Room');

var _Room2 = _interopRequireDefault(_Room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Routing 정의
var appRouting = _react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.hashHistory },
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '/' },
        _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _Login2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: 'signup', component: _Signup2.default }),
        _react2.default.createElement(
            _reactRouter.Route,
            { path: 'rooms', component: _Rooms2.default },
            _react2.default.createElement(_reactRouter.Route, { path: ':roomId', component: _Room2.default })
        )
    )
);

//Routing 초기화

// Import the functions you need from the SDKs you need
if (!location.hash.length) {
    location.hash = "#/login";
}

//firebase 초기화하기

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAdfrfRpkajKCAb0n02AsZvV3DRrMwhN-Y",
    authDomain: "electron-chat-fa35c.firebaseapp.com",
    projectId: "electron-chat-fa35c",
    storageBucket: "electron-chat-fa35c.appspot.com",
    messagingSenderId: "423236895934",
    appId: "1:423236895934:web:21bce9c9c4e53d0ee74aef",
    measurementId: "G-7XDWT35DN1"
};

// Initialize Firebase
(0, _app.initializeApp)(firebaseConfig);

//Application 렌더링
(0, _reactDom.render)(appRouting, document.getElementById("app"));