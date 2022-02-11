"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _Errors = require("./Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _firebaseBrowser = require("firebase/firebase-browser");

var _firebaseBrowser2 = _interopRequireDefault(_firebaseBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FORM_STYLE = {
    margin: "0 auto",
    padding: 30
};

var SIGNUP_LINK_STYLE = {
    display: "inline-block",
    marginLeft: 10
};

var Login = function (_React$Component) {
    _inherits(Login, _React$Component);

    function Login(props) {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        _this.state = {
            email: localStorage.userEmail || "",
            password: localStorage.userPassword || "",
            errors: []
        };
        _this.handleOnChangeEmail = _this.handleOnChangeEmail.bind(_this);
        _this.handleOnChangePassword = _this.handleOnChangePassword.bind(_this);
        _this.hadleOnSubmit = _this.hadleOnSubmit.bind(_this);
        return _this;
    }

    _createClass(Login, [{
        key: "handleOnChangeEmail",
        value: function handleOnChangeEmail(e) {
            this.setState({ email: e.target.value });
        }
    }, {
        key: "handleOnChangePassword",
        value: function handleOnChangePassword(e) {
            this.setState({ password: e.target.value });
        }

        //로그인 처리

    }, {
        key: "hadleOnSubmit",
        value: function hadleOnSubmit(e) {
            var _this2 = this;

            var _state = this.state,
                email = _state.email,
                password = _state.password;

            var errors = [];
            var isValid = true;
            e.preventDefault();
            if (!email.length) {
                isValid = false;
                errors.push("이메일이 입력하세요.");
            }
            if (!password.length) {
                isValid = false;
                errors.push("비밀번호를 입력하세요.");
            }
            if (!isValid) {
                //필수 입력 유효성 검사를 통과하지 못하면 오류 출력
                this.setState({ errors: errors });
                return;
            }
            // 통과 후 Firebase 로그인 처리
            _firebaseBrowser2.default.auth().signInWithEmailAndPassword(email, password).then(function () {
                //다음 접속 위해 localStorage 저장
                localStorage.userEmail = email;
                localStorage.userPassword = password;
                // 채팅방 목록 화면으로 이동
                _reactRouter.hashHistory.push("/rooms");
            }).catch(function () {
                //Firebase 로그인 오류
                _this2.setState({ errors: ['파이어베이스 로그인 오류'] });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "form",
                { style: FORM_STYLE, onSubmit: this.hadleOnSubmit },
                _react2.default.createElement(_Errors2.default, { errorMessages: this.state.errors }),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "Email address"
                    ),
                    _react2.default.createElement("input", {
                        type: "email",
                        className: "form-control",
                        placeholder: "email",
                        onChange: this.handleOnChangeEmail,
                        value: this.state.email
                    })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "label",
                        null,
                        "Password"
                    ),
                    _react2.default.createElement("input", {
                        type: "password",
                        className: "form-control",
                        placeholder: "password",
                        onChange: this.handleOnChangePassword,
                        value: this.state.password
                    })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                        "button",
                        { className: "btn btn-large btn-default" },
                        "Login"
                    ),
                    _react2.default.createElement(
                        "div",
                        { style: SIGNUP_LINK_STYLE },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: "/signup" },
                            "create new account"
                        )
                    )
                )
            );
        }
    }]);

    return Login;
}(_react2.default.Component);

exports.default = Login;