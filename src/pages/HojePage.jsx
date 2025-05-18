import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import styled from "styled-components";
import TopBar from "../components/TopBar";
import Menu from "../components/Menu";
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';


export default function HojePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [habitsToday, setHabitsToday] = useState([]);
    const today = dayjs().locale('pt-br'); 
    const dayOfWeek = today.format('dddd').split('-')[0]; 
    const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1); 
    const formattedDate = today.format('DD/MM'); 
    const [, , , setIsHabitosPageSelected] = useContext(UserContext)
    const [habitoSendoMarcado, setHabitoSendoMarcado] = useState(null)

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

    function buscarHabitosHoje() {
        const config = getConfig();
        if (!config) return navigate("/");
        setLoading(true);
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
        .then(res => {
            console.log(res.data)
            setHabitsToday(res.data);
            setLoading(false);
            setIsHabitosPageSelected(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }

    const marcarHabito = (id) => {
        const config = getConfig();
        
        setHabitoSendoMarcado(id)
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, config)
            .then(res => {
                setHabitsToday(prev => 
                    prev.map(habit => 
                        habit.id === id 
                            ? { 
                                ...habit, 
                                done: true,
                                currentSequence: habit.currentSequence + 1,
                                highestSequence: Math.max(habit.highestSequence, habit.currentSequence + 1)
                            } 
                            : habit
                    )
                );
                setHabitoSendoMarcado(null)
            })
            .catch(err => console.log("Erro ao marcar:", err.response.data))
    }

    const desmarcarHabito = (id) => {
        const config = getConfig();
        
        setHabitoSendoMarcado(id)
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config)
            .then(res => {
                setHabitsToday(prev => 
                    prev.map(habit => 
                        habit.id === id 
                            ? { 
                                ...habit, 
                                done: false,
                                currentSequence: habit.currentSequence > 0 ? habit.currentSequence - 1 : 0,
                                highestSequence: habit.highestSequence - 1 
                            } 
                            : habit
                    )
                );
                setHabitoSendoMarcado(null)
            })
            .catch(err => console.log("Erro ao desmarcar:", err.response.data))
    }

    useEffect(() => {
        buscarHabitosHoje();
    }, []);

    return(
        <Container>
            <Conteudo>
                <TopBar/>
                <DiaHoje>
                    {capitalizedDay}, {formattedDate}
                </DiaHoje>
                <TodayList>
                    {loading && <ThreeDots height="80" width="80" color="#126BA5" secondaryColor="#52B6FF"/>}

                    {!loading && habitsToday.length === 0 && <Aviso>Você não tem nenhum hábito marcado para o dia de hoje!</Aviso>} 

                    {!loading && habitsToday.length > 0 && (
                        habitsToday.map( habit => (
                            <HabitContainer key={habit.id}>
                                <Info>
                                    <h1>{habit.name}</h1>
                                    <p>Sequência atual: {habit.currentSequence}</p>
                                    <p>Seu recorde: {habit.highestSequence}</p>
                                </Info>
        
                                <Marked
                                    as="button"
                                    type="button"
                                    disabled={habitoSendoMarcado === habit.id}
                                    done={habit.done}
                                    onClick={() => {
                                        habit.done ? desmarcarHabito(habit.id) : marcarHabito(habit.id);
                                    }}
                                    >
                                    <CheckRoundedIcon sx={{ fontSize: 50, color: 'white'}}/>      
                                </Marked>
                            </HabitContainer >
                        ))
                    )}
                </TodayList>
                <Menu/>
            </Conteudo>
        </Container>
    )
}

const Container = styled.div`
    justify-content: center;
    display: flex;
`
const Conteudo = styled.div`
    width: 340px;
    display: flex;
    flex-direction: column;
    padding: 103px 0px;
    align-items: center;
`
const DiaHoje = styled.div`
    font-size: 23px;
    font-weight: 400;
    font-family: "Lexend Deca", sans-serif;
    color: #126BA5;
    width: 100%;
    margin-bottom: 28px;
`
const TodayList = styled.div`

`
const Info = styled.div`
    h1{
        font-size: 20px;
        font-family: "Lexend Deca", sans-serif;
        color: #666666;
        overflow-wrap: break-word;
        margin-bottom: 10px;
    }
    p{
        font-size: 13px;
        font-family: "Lexend Deca", sans-serif;
        color: #666666;
        overflow-wrap: break-word;
        margin-bottom: 2px;
    }
`
const HabitContainer = styled.div`
    display: flex;
    width: 340px;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 15px;
    align-items: center;
    justify-content: space-between;
`
const Marked = styled.button`
    width: 69px;
    height: 69px;
    background-color: ${props => props.done ? '#8FC549' : '#EBEBEB'};
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
const Aviso = styled.p`
    text-align: center;
    margin-top: 29px;
    color: #666;
    font-size: 18px;
    font-family: "Lexend Deca", sans-serif;
`;
