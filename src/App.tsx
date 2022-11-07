import React from 'react';
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import { Grid } from "@material-ui/core"
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';


function App() {
  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/cadastroUsuario" element={<CadastroUsuario />}/>
          </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App