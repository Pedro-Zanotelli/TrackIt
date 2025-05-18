import { Link } from "react-router-dom";
import styled from "styled-components";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import UserContext from "../contexts/UserContext";
import { useContext } from "react";


export default function Menu() {
const [, , isHabitosPageSelected] = useContext(UserContext)

    return(
        <Container>
            <Habitos to={`/habitos`} selected={isHabitosPageSelected}>
                <CalendarMonthIcon sx={{ fontSize: 24 }}/> 
                <p>Hábitos</p>
            </Habitos>
            <Hoje to={`/hoje`} selected={isHabitosPageSelected}>
                <EventAvailableIcon sx={{ fontSize: 24 }}/> 
                <p>Hoje</p>
            </Hoje >
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 65px;
    font-size: 18px;
    font-family: "Lexend Deca", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Habitos = styled(Link)`
    background-color: ${props => props.selected ? '#52B6FF' : '#FFFFFF'};
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${props => props.selected ? '#ffffff' : '#CFCFCF'};
    p{
        margin-left: 5px;
    }
`
const Hoje = styled(Link)`
    background-color: ${props => props.selected ? '#FFFFFF' : '#52B6FF'};
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${props => props.selected ? '#CFCFCF' : '#ffffff'};
    p{
        margin-left: 5px;
    }
`