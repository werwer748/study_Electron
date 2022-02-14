import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import io from "socket.io-client";

const socket = io.connect("http://localhost:80");
socket.emit("init", { name: "HugoK" });

function App() {
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState({
    name: '',
    message: '',
  });

  useEffect(() => {
    return () => {
      socket.close();
    };
  },[]);

  useEffect(() => {
    socket.on('receive message', (message) => {
      //receive message 이벤트에 대한 콜백을 등록
      setChatArr((chatArr) => chatArr.concat(message));
    });
  },[]);

  const buttonHandler = useCallback((e) => {
    //버튼 클릭했을 때 send message 이벤트 발생
    e.preventDefault();
    socket.emit('send message', { name: chat.name, message: chat.message });
  }, [chat]);

  const changeMessage = useCallback((e) => {
    setChat({ name: chat.name, message: e.target.value });
  }, [chat]);

  const changeName = useCallback((e) => {
    setChat({ name: e.target.value, message: chat.message });
  }, [chat]);

  return (
    <div className="App">
        <div className='Box'>
          <div className='ChatBox'>
            {chatArr.map((ele, i) => (
              <div className='Chat' key={i}>
                <div>{ele.name}</div>
                <div className='ChatLog'>{ele.message}</div>
              </div>
            ))}
          </div>
          <form onSubmit={buttonHandler}>
          <div className='InputBox'>
            <input placeholder='내용' onChange={changeMessage}/>
            <input placeholder='이름' onChange={changeName}/>
            <button>등록</button>
          </div>
          </form>
        </div>
    </div>
  );
}

export default App;
