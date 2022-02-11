import React from "react";
import { Link, hashHistory } from "react-router";
import RoomItem from "./RoomItem";
import firebase from "firebase/firebase-browser";

const ICON_CHAT_STYLE = {
    fontSize: 120,
    color: "#DDD"
};

const FORM_STYLE = {
    display: "flex"
};

const BUTTON_STYLE = {
    marginLeft: 10
};

export default class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: "",
            rooms: []
        };
        this.db = firebase.database();
        this.handleOnChangeRoomName = this.handleOnChangeRoomName.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount() {
        //컴포넌트 초기화 시 채팅방 목록 추출
        this.fetchRooms();
    }

    handleOnChangeRoomName(e){
        this.setState({
            roomName: e.target.value
        });
    }

    //새 채팅방 만들기
    handleOnSubmit(e) {
        const { roomName } = this.state;
        e.preventDefault();
        if (!roomName.length) {
            return;
        }

        // Firebase 데이터베이스에 새로운 채팅방 만들기
        const newRoomRef = this.db.ref("/chatrooms").push();
        const newRoom = {
            description: roomName
        };

        // 생성한 채팅방의 description 변경하기
        newRoomRef.update(newRoom)
        .then(() => {
            // 상태를 다시 초기화
            this.setState({ roomName: "" });
            return this.fetchRooms()
            .then(() => {
                hashHistory.push(`/rooms/${newRoomRef.key}`);
            });
        });
    }
    
    //채팅방 목록 추출 처리
    fetchRooms() {
        //Firebase 데이터베이스에서 채팅방 20개 가져오기
        return this.db.ref("/chatrooms").limitToLast(20).once("value")
        .then(snapshot => {
            const rooms = [];
            snapshot.forEach(item => {
                //DB에서 추출한 데이터 객체로 할당
                rooms.push(Object.assign({ key: item.key }, item.val()));
            });
            // 가져온 객체 배열을 컴포넌트 state에 설정
            this.setState({ rooms })
        })
    };

    //왼쪽 채팅방 목록 렌더링
    renderRoomList() {
        const { roomId } = this.props.params;
        const { rooms, roomName } = this.state;
        return (
            <div className="list-group">
                {rooms.map(r => <RoomItem room={r} key={r.key}
                selected={r.key === roomId} /> )}
                <div className="list-group-header">
                    <form style={FORM_STYLE} onSubmit={this.handleOnSubmit}>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="방 만들기"
                            onChange={this.handleOnChangeRoomName}
                            value={roomName}
                        />
                        <button className="btn btn-default" style={BUTTON_STYLE}>
                            <span className="icon icon-plus" />
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // 채팅방 상세 렌더링
    renderRoom() {
        if (this.props.children) {
            return this.props.children;
        } else {
            return (
                <div className="text-center">
                    <div style={ICON_CHAT_STYLE}>
                        <span className="icon icon-chat" />
                    </div>
                    <p>
                        채팅방 참여하세요~
                    </p>
                </div>
            )
        }
    }

    render(){
        return (
            <div>
                <h2>Rooms</h2>
                <ul>
                    <li><Link to="/rooms/1">Room 1</Link></li>
                    <li><Link to="/rooms/2">Room 2</Link></li>
                </ul> <br />
                <div>{this.props.children}</div> <br />
                <div>
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
            </div>
        );
    };
};