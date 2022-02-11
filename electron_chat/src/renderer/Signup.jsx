import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";

const SIGNUP_FORM_STYLE = {
    margin: "0 auto",
    padding: 30
};

const CANCEL_BUTTON_STYLE = {
    marginLeft: 10
};

//16.8 부터 hooks 사용 가능 따라서 class형으로 진행
export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            photoURL: "",
            errors: []
        };

        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnChangeName = this.handleOnChangeName.bind(this);
        this.handleOnChangePhotoURL = this.handleOnChangePhotoURL.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChangeEmail(e){
        this.setState({ email: e.target.value });
    }
    
    handleOnChangePassword(e){
        this.setState({ password: e.target.value });
    }
    
    handleOnChangeName(e){
        this.setState({ name: e.target.value });
    }
    
    handleOnChangePhotoURL(e){
        this.setState({ photoURL: e.target.value });
    }

    handleOnSubmit(e) {
        const { email, password, name, photoURL } = this.state;
        const errors = [];
        let isValid = true;
        e.preventDefault();

        if (!email.length) {
            isValid = false;
            errors.push("이메일을 입력하셈");
        }
        if (!password.length) {
            isValid = false;
            errors.push("비밀번호를 입력하세요~");
        }
        if (!name.length) {
            isValid = false;
            errors.push("사용자이름 입력 ㄱㄱ");
        }
        if (!isValid) {
            //유효성 검사 통과 못함
            this.setState({ errors });
            return;
        }
        // Firebase 신규계정 처리
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(newUser => {
            // 사용자 정보 변경
            return newUser.updateProfile({
                displayName: name,
                photoURL
            });
        }).then(() => { hashHistory.push("/rooms")})
        .catch(err => {
            //Firebase 오류
            this.setState({ errors: [err.message] });
        });
    };
    render() {
        return (
            <form style={SIGNUP_FORM_STYLE} onSubmit={this.handleOnSubmit}>
                <Errors errorMessages={this.state.errors} />
                <div className="form-group">
                    <label>이메일 주소 *</label>
                    <input 
                        type="email"
                        className="form-control"
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.handleOnChangeEmail}
                    />
                </div>
                <div className="form-group">
                    <label>비밀번호 *</label>
                    <input 
                        type="password"
                        className="form-control"
                        placeholder="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleOnChangePassword}
                    />
                </div>
                <div className="form-group">
                    <label>사용자 이름</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="user name"
                        value={this.state.name}
                        onChange={this.handleOnChangeName}
                    />
                </div>
                <div className="form-group">
                    <label>사진 URL</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="photo URL"
                        value={this.state.photoURL}
                        onChange={this.handleOnChangePhotoURL}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-large btn-primary">생성하기</button>
                    <Link to="/login">
                        <button
                            type="button"
                            style={CANCEL_BUTTON_STYLE}
                            className="btn btn-large btn-default"
                        >
                            취소
                        </button>
                    </Link>
                </div>
            </form>
        );
    }
};