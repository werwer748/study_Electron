import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Main = styled.div`
    width:100%;
    min-height:100vh;
    margin-top: 64px;
`;

const Layout = ({ children }) => {
    return(
        <>
            <Header />
                <Main>
                    { children }
                </Main>
            <Sidebar />
        </>
    );
};

export default Layout;