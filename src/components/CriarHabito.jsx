import styled from "styled-components";
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const diasDaSemana = [
  { id: 0, nome: 'D' },
  { id: 1, nome: 'S' },
  { id: 2, nome: 'T' },
  { id: 3, nome: 'Q' },
  { id: 4, nome: 'Q' },
  { id: 5, nome: 'S' },
  { id: 6, nome: 'S' }
];

export default function CriarHabito({ loading, onSubmit, onCancel, mostrarForm }) {
    const [name, setName] = useState("");
    const [days, setDays] = useState([]);

    const enviarHabito = (e) => {
        e.preventDefault();
        onSubmit({ name, days })
        setName("");
        setDays([]); 
    }

    return (
        <div style={{ display: mostrarForm ? "block" : "none" }}>
            <Form onSubmit={enviarHabito}>
                <Input 
                    type="text"
                    placeholder="nome do hábito"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />

                <Dias>
                    {diasDaSemana.map((dia) => (
                        <DiaButton 
                            key={dia.id} 
                            type="button" 
                            selecionado={days.includes(dia.id)}
                            onClick={() => {
                                const addDias = days.includes(dia.id)
                                    ? days.filter(d => d !== dia.id)
                                    : [...days, dia.id];
                                setDays(addDias)
                            }}
                            disabled={loading}
                        >
                            {dia.nome}
                        </DiaButton>        
                    ))}
                </Dias>

                <Botoes>
                    <Cancelar
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancelar
                    </Cancelar>

                    <Salvar type="submit" disabled={loading}>
                        {loading ? <ThreeDots height="11" width="43" color="#FFFFFF" /> : "Salvar"}
                    </Salvar>
                </Botoes>
            </Form>
        </div>    
    );
}

const Form = styled.form`
    background: #FFFFFF;
    padding: 18px;
    margin-top: 20px;
    border-radius: 5px;
`;

const Input =  styled.input`
    width: 292px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 11px;
    margin-bottom: 8px;
    font-size: 20px;
    font-family: "Lexend Deca", sans-serif;

    &::placeholder {
        color: #CFCFCF;
    }
`
const Dias = styled.div`
    display: flex;
    gap: 4px;
    margin-bottom: 15px;
`;

const DiaButton = styled.button`
    width: 30px;
    height: 30px;
    border: 1px solid ${props => props.selecionado ? '#CFCFCF' : '#D5D5D5'};
    border-radius: 5px;
    background: ${props => props.selecionado ? '#CFCFCF' : '#FFFFFF'};
    color: ${props => props.selecionado ? '#FFFFFF' : '#CFCFCF'};
    font-size: 20px;
    font-family: "Lexend Deca", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Botoes = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 15px;
`;

const Cancelar = styled.button`
    background: none;
    color: #52B6FF;
    font-size: 14px;
    border: none;
    font-size: 16px;
    width: 84px;
    height: 35px;
    font-family: "Lexend Deca", sans-serif;
    cursor: pointer;
`;

const Salvar = styled.button`
    background: #52B6FF;
    color: #FFFFFF;
    width: 84px;
    height: 35px;
    border-radius: 5px;
    font-size: 14px;
    border: none;
    font-size: 16px;
    font-family: "Lexend Deca", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;