"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Room = function Room() {
    return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
            "h3",
            null,
            "Room"
        )
    );
};

exports.default = Room;

// export default class Room extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h3>Room</h3>
//             </div>
//         );
//     };
// }