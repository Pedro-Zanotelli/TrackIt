import logoTopBar from "../assets/logoTopBar.png"
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
    const [user] = useContext(UserContext)
    return(
        <Container>
            <Logo to={`/`}>
                <img src={logoTopBar} alt="Logo"/> 
            </Logo>
            {user && <User src={user.image} alt="User" />}
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    background-color: #126BA5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 67px;
`
const Logo = styled(Link)`
    img{
        width: 97px;
        height: 30px;
        margin-left: 18px;
    }
`
const User = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 50%;
    margin-right: 18px;
`