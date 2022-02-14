import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 30%;
  height: 100vh;
  margin-left: 0%;

  .list {
      width: 100%;
      background-color: pink;
      color: white;
      font-weight: bold;
      font-size: 1.5em;

      >li:first-of-type {
          cursor: pointer;
      }
  }
`;

const Sidebar = () => {
    // const goLink = (link) => {
    //     if (link === '') {
    //         // return window.location.hash=`/#`;    
    //         return navigate('/#');
    //     }
    //     // window.location.hash=`#/${link}`;
    //     navigate(`#/${link}`);
    // };

    return (
        <Container>
            <ul className="list">
                {/* <li onClick={() => goLink('')}>원복</li> */}
                <Link to="/">원복</Link>
                {/* <li onClick={() => goLink('Global')}>글로벌 그룹 채팅방</li> */}
                <Link to="/Global">글로벌 그룹 채팅방</Link>
                <li>LIVE</li>
                <li>Friends</li>
                <li>모아보기</li>
            </ul>
        </Container>
    );
};

export default Sidebar;