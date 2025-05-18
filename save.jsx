
const Container = styled.div`
    display: flex;
    justify-content: center;
`

const Conteudo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 98px 0px;
    width: 100%;
    justify-content: center;
     
    @media (min-width: 550px) {
        width: 340px;
    }
`

const Header = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
    margin-right: 50px;

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

/////////////

const ListContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    max-width: 800px; /* Largura máxima para telas grandes */
`;

const HabitItem = styled.div`
    width: calc(100% - 50px);
    margin-left: 25px;
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
    flex-wrap: wrap; /* Permite que os dias quebrem linha */
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
