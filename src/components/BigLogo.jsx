import logo from "../assets/logo.png"
import styled from "styled-components";


export default function BigLogo() {
    return(
        <Logo>
            <img src={logo}/>
        </Logo>
    )
}

const Logo = styled.div`
    img {
        width: 180px;
        height: 178px;
        object-fit: cover;
    }
`