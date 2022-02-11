import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";

const FORM_STYLE = {
    margin: "0 auto",
    padding: 30
};

const SIGNUP_LINK_STYLE = {
    display: "inline-block",
    marginLeft: 10
};

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.userEmail || "",
            password: localStorage.userPassword || "",
            errors: [],
        };
        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.hadleOnSubmit = this.hadleOnSubmit.bind(this);
    }

    handleOnChangeEmail(e){
        this.setState({ email: e.target.value });
    }

    handleOnChangePassword(e){
        this.setState({ password: e.target.value });
    }

    //로그인 처리
    hadleOnSubmit(e) {
        const { email, password } = this.state;
        const errors = [];
        let isValid = true;
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
            this.setState({ errors });
            return;
        }
        // 통과 후 Firebase 로그인 처리
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            //다음 접속 위해 localStorage 저장
            localStorage.userEmail = email;
            localStorage.userPassword = password;
            // 채팅방 목록 화면으로 이동
            hashHistory.push("/rooms");
        })
        .catch(() => {
            //Firebase 로그인 오류
            this.setState({ errors: ['파이어베이스 로그인 오류'] });
        });
    }

    render () {
        return (
            <form style={FORM_STYLE} onSubmit={this.hadleOnSubmit}>
                <Errors errorMessages={this.state.errors} />
                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        type="email"
                        className="form-control"
                        placeholder="email"
                        onChange={this.handleOnChangeEmail}
                        value={this.state.email}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password"
                        className="form-control"
                        placeholder="password"
                        onChange={this.handleOnChangePassword}
                        value={this.state.password}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-large btn-default">Login</button>
                    <div style={SIGNUP_LINK_STYLE}>
                        <Link to="/signup">create new account</Link>
                    </div>
                </div>
            </form>
        );
    }
}