import { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import BigLogo from "../components/BigLogo";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function CadastroPage() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate()
    
    function cadastrar(event) {
        event.preventDefault();
        setLoading(true)
        const body = {email, name, image, password}

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body)
            .then(res => {
                navigate("/")
                console.log(res.data)
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
            <Form onSubmit={cadastrar}>
                
                <Input 
                    type="email"
                    placeholder="email"
                    disabled={loading}
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input 
                    type="password"
                    placeholder="senha"
                    disabled={loading}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Input 
                    type="text"
                    placeholder="nome"
                    disabled={loading}
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input 
                    type="url"
                    placeholder="foto"
                    disabled={loading}
                    required
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />

                <Cadastrar type="submit" disabled={loading}>
                    {!loading ? "Cadastrar" :  <ThreeDots height="13" width="51" color="#FFFFFF"/>}
                </Cadastrar>
            </Form>
            <Login to={`/`}>
                <p>Já tem uma conta? Faça login!</p>
            </Login>
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
const Cadastrar = styled.button`
    width: 100%;
    height: 45px;
    padding: 10px;
    background-color: #52B6FF;
    color: #ffffff;
    text-align: center;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 21px;
    text-decoration: none; 
    border-radius: 5px;
    border: none;
    margin-bottom: 25px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:disabled {
       background-color: #86ccff
    }
`;

const Login = styled(Link)`
    p {
        font-size: 14px;
        font-weight: 400;
        font-family: "Lexend Deca", sans-serif;
        text-decoration: underline;
        color: #52B6FF;
        cursor: pointer;
    }
`