import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 10vh;
    background: pink;

    .EmoIcon {
        width: 10%;
        font-size: 10em;
        font-weight: bold;
    }

    .MyAvatar {
        width: 10%;
        border-radius: 50%;
        text-align: center;
        background-color: royalblue;
        color: white;
    }
`;

const Header = () => {
    return (
        <Container>
            <div className="EmoIcon">
                emoLive
            </div>
            <div className="MyAvatar">
                강
            </div>
        </Container>
    );
}

export default Header;