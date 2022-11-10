import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Tema from '../../../models/Tema';
import { Box } from '@mui/system';
import './ListaTema.css';
import useLocalStorage from 'react-use-localstorage';
import { useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';


function ListaTema() {
    let history = useNavigate();
    const [temas, setTemas] = useState<Tema[]>([]);
    const [token, setToken] = useLocalStorage('token');
    

    useEffect(() => {
        if (token == '') {
            alert("Você precisa estar logado!")
            history("/login")
        }
    }, [token])

    async function getTemas() {
        await busca('/temas/all', setTemas, {
            headers: { Authorization: token },
        });
    }

    useEffect(() => {
        getTemas();
    }, [temas.length]);

    return (
        <>
            {
                temas.map(tema => (
                    <Box m={2}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Tema
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {tema.descricao}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box display="flex" justifyContent="center" mb={1.5}>
                                    <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button
                                                variant="contained" className="marginLeft" size="small" color="primary">
                                                atualizar
                                            </Button>
                                        </Box>
                                    </Link>
                                    <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button variant="contained" size="small" color="secondary">
                                                deletar
                                            </Button>
                                        </Box>
                                    </Link>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                ))
            }
        </>
    );
}

export default ListaTema;