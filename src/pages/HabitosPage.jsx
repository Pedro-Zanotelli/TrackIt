import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import TopBar from "../components/TopBar";
import Menu from "../components/Menu";
import axios from "axios";
import styled from "styled-components";
import HabitsList from "../components/HabitsList";
import CriarHabito from "../components/CriarHabito";
import Modal from "../components/Modal";

export default function HabitosPage() {
    const navigate = useNavigate();
    const [habitos, setHabitos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [selectedHabitId, setSelectedHabitId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [, , , setIsHabitosPageSelected] = useContext(UserContext)

    function getConfig() {
        const storedUser = localStorage.getItem("user");
        if ( !storedUser ) return null;

        const parsedUser = JSON.parse(storedUser);
        return {
            headers: {
                Authorization: `Bearer ${parsedUser.token}`
            }       
        };
    }

    const criarNovoHabito = (novoHabito) => {
        const config = getConfig();
        if (!config) {
            navigate("/");
            return;
        }

        setLoading(true)
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", novoHabito, config)
            .then(res => {
                setHabitos([...habitos, res.data])
                setMostrarForm(false)
                setLoading(false)
            })
            .catch(err => {
                console.log(err.response.data)
                setLoading(false)
            })
    }
    
    useEffect(() => {
        const config = getConfig();
        if (!config) {
            navigate("/");
            return;
        }

        setLoading(true);
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
            .then(res => {
                setHabitos(res.data);
                setLoading(false);
                console.log( res.data);
                setIsHabitosPageSelected(true)
            })
            .catch(err => {
                console.log(err.response.data.id)
                setLoading(false)
            });
    }, []);

    const deletarHabito = () => {
        const config = getConfig();
        if (!selectedHabitId) return;

        setLoading(true);
        axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${selectedHabitId}`, config)
            .then(res => {
                setHabitos(habitos.filter(habito => habito.id !== selectedHabitId));
                setLoading(false);
                setIsDeleteModalOpen(false);
                setSelectedHabitId(null);
            })
            .catch(err => {
                console.log(err.response.data)
                setLoading(false);
                setIsDeleteModalOpen(false);
            })
    };

    return(
        <Container>
            <TopBar/>

            <Conteudo>
                <Header>
                    <h1>Meus hábitos</h1>
                    <button 
                        onClick={() => setMostrarForm(true)}
                        disabled={loading}
                    >
                        +
                    </button>
                </Header>

    
                <CriarHabito
                    onSubmit={criarNovoHabito}
                    onCancel={() => setMostrarForm(false)}
                    mostrarForm={mostrarForm}
                    loading={loading}
                />

                <HabitsList 
                    habitos={habitos}
                    loading={loading}
                    onHabitClick={(id) => {
                        setSelectedHabitId(id);
                        setIsDeleteModalOpen(true);
                    }}
                />
            </Conteudo>

            <Menu/>
            
            <Modal
                isDeleteModalOpen={isDeleteModalOpen}
                deletarHabito={deletarHabito}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                loading={loading}
            />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const Conteudo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 98px 0px;
    width: 340px;
`

const Header = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-size: 23px;
        font-weight: 400;
        font-family: "Lexend Deca", sans-serif;
        color: #126BA5;
    }

    button {
        width: 40px;
        height: 35px;
        border-radius: 5px;
        border: none;
        font-size: 27px;
        background-color: #52B6FF;
        color: white;
        cursor: pointer;
    }
`

