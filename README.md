# TrackIt

<div align="center">
  <img src="./src/assets/logoTopBar.png" alt="TrackIt Logo" width="200" />
</div>

## Descrição

TrackIt é uma aplicação web para o gerenciamento de hábitos diários, construída com React, React Router, Context API e integração com uma API RESTful simulada. O usuário pode cadastrar-se, fazer login, criar, remover, marcar e desmarcar hábitos, além de acompanhar suas sequências e recordes.

---

## 📑 Sumário

- [Funcionalidades](#funcionalidades)  
- [Tecnologias](#tecnologias)  
- [Estrutura de Pastas](#estrutura-de-pastas)  
- [Componentes Principais](#componentes-principais)  
- [Context API](#context-api)  
- [Integração com API](#integração-com-api)  
- [Instalação e Uso](#instalação-e-uso)  
- [Scripts Disponíveis](#scripts-disponíveis)  
- [Autor](#autor)  

---

## Funcionalidades

- **Cadastro e Login**: Criação de conta com nome, e-mail, senha e foto; autenticação via token.  
- **Dashboard de Hábitos**: Exibição de lista de hábitos criados, com dias da semana selecionáveis.  
- **Criação de Hábito**: Formulário para nome e seleção de dias.  
- **Exclusão de Hábito**: Modal de confirmação antes de deletar.  
- **Hoje**: Página diária com hábitos a serem marcados/desmarcados.  
- **Loading States**: Feedback visual durante requisições (globais e locais).  
- **Navegação**: React Router para rotas de Login, Cadastro, Hábitos e Hoje.  

---

## Tecnologias

- **React** e **React Hooks** (`useState`, `useEffect`, `useContext`)  
- **React Router** para navegação  
- **Context API** para gerenciamento de usuário e seleção de página  
- **Axios** para requisições HTTP  
- **Styled‑Components** para estilo modularizado  
- **Day.js** para formatação de datas  
- **Material‑UI** (MUI) para ícones e componentes de modal  
- **react-loader-spinner** para spinners de carregamento  

---

## Estrutura de Pastas

```plaintext
trackit/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/          # Logos, imagens
│   ├── components/      # Componentes reutilizáveis
│   │   ├── BigLogo.jsx
│   │   ├── CriarHabito.jsx
│   │   ├── HabitsList.jsx
│   │   ├── Menu.jsx
│   │   ├── Modal.jsx
│   │   ├── TopBar.jsx
│   │   └── ...
│   ├── contexts/        # Context API
│   │   └── UserContext.js
│   ├── pages/           # Páginas principais
│   │   ├── CadastroPage.jsx
│   │   ├── HabitosPage.jsx
│   │   ├── HojePage.jsx
│   │   ├── LoginPage.jsx
│   │   └── ...
│   ├── App.jsx          # Configuração de rotas e provider
│   ├── index.js
│   └── reset.css
└── package.json

## Como Executar o Projeto

0. **Pré-requisitos:**
   Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina.

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/TrackIt.git
   cd TrackIt
   ```

2. **Instalar as Dependências:**
   ```bash
   npm install 
   ```

3. **Executar o Projeto:**
   ```bash
   npm run dev
   ```

4. **Abrir no Navegador:**
   Acesse `http://localhost:5173` para visualizar o projeto.
