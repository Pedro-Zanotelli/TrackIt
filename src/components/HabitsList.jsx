import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

const diasDaSemana = [
  { id: 0, nome: 'D' }, 
  { id: 1, nome: 'S' }, 
  { id: 2, nome: 'T' }, 
  { id: 3, nome: 'Q' }, 
  { id: 4, nome: 'Q' }, 
  { id: 5, nome: 'S' }, 
  { id: 6, nome: 'S' }, 
];

export default function HabitsList({ habitos, loading, onHabitClick  }){
    return (
        <ListContainer>

            {loading && <ThreeDots height="80" width="80" color="#126BA5" secondaryColor="#52B6FF"/>}

            {!loading && habitos.length === 0 && <Aviso>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Aviso>} 
            
            {!loading && habitos.length > 0 && (
                habitos.map(habito => (
                    <HabitItem key={habito.id} onClick={() => onHabitClick(habito.id)} style={{ cursor: 'pointer' }}>
                        <p>{habito.name}</p>
                        <Dias>
                            {diasDaSemana.map((dia) => (
                                <DiaButton key={dia.id} selecionado={habito.days.includes(dia.id)}>
                                    {dia.nome}
                                </DiaButton>
                            ))}
                        </Dias>
                    </HabitItem>
                ))
            )}    
        </ListContainer>
    );    
}

const ListContainer = styled.div`
    margin-top: 20px;
`;

const HabitItem = styled.div`
    width: 340px;
    background: #fff;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    p{
        font-size: 20px;
        font-family: "Lexend Deca", sans-serif;
        color: #666666;
        overflow-wrap: break-word;
    }
`;

const Dias = styled.div`
    display: flex;
    gap: 4px;
    margin-top: 8px;
`;

const DiaButton = styled.button`
    width: 30px;
    height: 30px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    background: ${props => props.selecionado ? '#CFCFCF' : '#FFFFFF'};
    color: ${props => props.selecionado ? '#FFFFFF' : '#CFCFCF'};
    font-size: 20px;
    font-family: "Lexend Deca", sans-serif;
`;

const Aviso = styled.p`
    text-align: center;
    margin-top: 29px;
    color: #666;
    font-size: 18px;
    font-family: "Lexend Deca", sans-serif;
`;

