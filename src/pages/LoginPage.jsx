import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BigLogo from "../components/BigLogo";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [user, setUser] = useContext(UserContext)

    function login(event){
        event.preventDefault();
        setLoading(true)
        const body = {email, password}

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
            .then(res => {
                setUser(res.data)
                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/habitos")
                setLoading(false)
            })
            .catch(err => {
                console.log(err.response.data)
                alert(err.response.data.message)
                setLoading(false)
            })
    }

    return (
        <Container>
            <BigLogo/>
            <Form onSubmit={login}>
                <Input 
                    type="email"
                    placeholder="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input 
                    type="password"
                    placeholder="senha"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <Login type="submit">
                    {!loading ? "Entrar" :  <ThreeDots height="13" width="51" color="#FFFFFF" />}
                </Login>
            </Form>
            <Cadastrar to={`/cadastro`}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Cadastrar>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    margin-top: 67px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
` 
const Form = styled.form`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    
    ::placeholder {
    color: #DBDBDB;
    font-size: 19px;
    font-family: "Lexend Deca", sans-serif;
}
`
const Input = styled.input`
    outline: none;
    width: 303px;
    height: 45px;
    padding: 11px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    margin-bottom: 6px;
`
const Login = styled.button`
    width: 100%;
    height: 45px;
    padding: 10px;
    background-color: #52B6FF;
    color: #ffffff;
    display: flex;
    justify-content: center;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 21px;
    align-items: center;
    text-decoration: none; 
    border-radius: 5px;
    border: none;
    margin-bottom: 25px;
    cursor: pointer;
`;

const Cadastrar = styled(Link)`
    p {
        font-size: 14px;
        font-weight: 400;
        font-family: "Lexend Deca", sans-serif;
        text-decoration: underline;
        color: #52B6FF;
        cursor: pointer;
    }
`