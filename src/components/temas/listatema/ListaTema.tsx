import { Box, Button, Card, CardActions, CardContent, Container, Typography, } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

function ListaTema() {

    return (
        <>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Tema
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Minha descrição
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="center" mb={1.5}>
                            <Link
                                to='' className="text-decorator-none">
                                <Box mx={1}>
                                    <Button
                                        variant="contained" className="marginLeft" size="small" color="primary">
                                        atualizar
                                    </Button>
                                </Box>
                            </Link>
                            <Link to='' className="text-decorator-none">
                                <Box mx={1}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="error"
                                    >
                                        deletar
                                    </Button>
                                </Box>
                            </Link>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}

export default ListaTema;