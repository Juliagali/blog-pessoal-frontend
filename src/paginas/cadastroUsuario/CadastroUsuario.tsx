import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import "./CadastroUsuario.css";
import { cadastroUsuario } from '../../services/Service';
import User from '../../models/User';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function CadastroUsuario() {

    let navigate = useNavigate();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: "",
            usuario: "",
            foto: "",
            senha: "" 
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: "",
            usuario: "",
            foto: "",
            senha: ""
        });

    useEffect(() => {
        if (userResult.id != 0) {
            navigate("/login")
        }
    }, [navigate, userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }


    function updateModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (confirmarSenha == user.senha) {
            cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            toast.success('usuário cadastrado com sucesso!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });        } else {
                toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                });        }
    }


    return (
        <>
            <Grid container alignItems='center'>
                <Grid item xs={6} className='imagem2'></Grid>
                <Grid item xs={6} display='flex' justifyContent='center'>
                    <Grid item xs={8} justifyContent='center'>
                        <Typography variant='h3' align='center'>Cadastre-se</Typography>
                        <form onSubmit={onSubmit}>
                            <TextField
                            value={user.nome}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                id="nome"
                                label="Nome"
                                name="nome"
                                fullWidth
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                value={user.usuario}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                id="usuario"
                                label="Usuário (e-mail)"
                                name="usuario"
                                fullWidth
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                value={user.foto}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                id="foto"
                                label="Foto (url)"
                                name="foto"
                                fullWidth
                                margin="normal"
                                variant="outlined" />    
                            <TextField
                                value={user.senha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                                id="senha"
                                label="Senha"
                                name="senha"
                                type="password"
                                fullWidth
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                value={confirmarSenha}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)}
                                id="confirmarSenha"
                                label="Confirmar Senha"
                                name="confirmarSenha"
                                type="password"
                                fullWidth
                                margin="normal"
                                variant="outlined" />
                            <Box display='flex' justifyContent='center' gap={4} marginTop={2}>
                                <Link to='/login' className='text=decorator-none'>
                                    <Button variant='contained' color='error'>Cancelar</Button>
                                </Link>
                                <Button type='submit' variant='contained' color='primary'>Cadastrar</Button>
                            </Box>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CadastroUsuario;