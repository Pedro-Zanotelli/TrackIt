import './reset.css'
import CadastroPage from './pages/CadastroPage'
import HabitosPage from './pages/HabitosPage'
import HojePage from './pages/HojePage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import { useEffect } from 'react'
import UserContext from './contexts/UserContext'


export default function App() {
  const [user, setUser] = useState(null)
  const [isHabitosPageSelected, setIsHabitosPageSelected] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  return(
    <UserContext.Provider value ={[user, setUser, isHabitosPageSelected, setIsHabitosPageSelected]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/cadastro" element={<CadastroPage />}/>
          <Route path="/habitos" element={<HabitosPage />}/>
          <Route path="/hoje" element={<HojePage />}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>    
  )
}