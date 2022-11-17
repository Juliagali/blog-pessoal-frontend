import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema'
import { busca, buscaId, post, put } from '../../../services/Service'
import { TokenState } from '../../../store/tokens/tokensReducer';

function CadastroPost() {
    let history = useNavigate()
    const { id } = useParams<{ id: string }>()
    const [temas, setTemas] = useState<Tema[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )


    useEffect(() => {
        if (token === '') {
            toast.error('você precisa estar logado', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            }); history('/login')
        }
    }, [token])


    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        data: '',
        texto: '',
        titulo: '',
        tema: null
    })

    function updatedModel(event: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [event.target.name]: event.target.value,
            tema: tema
        })
    }

    async function buscaTema() {
        await busca("/temas/all", setTemas, {
            headers: {
                Authorization: token,
            },
        });
    }

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    async function findByIdPostagem(id: string) {
        await buscaId(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        buscaTema()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        if (id !== undefined) {
            try {
                await put('/postagens', postagem, setPostagem, {
                    headers: {
                        Authorization: token
                    }
                })
                toast.success('postagem atualizada com sucesso!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                });
            } catch (error) {
                toast.error('falha ao atualizar postagem', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                });
            }
        } else {
            try {
                await post('/postagens', postagem, setPostagem, {
                    headers: {
                        Authorization: token
                    }
                })
                toast.success('postagem cadastrada com sucesso!', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                });
            } catch (error) {
                toast.error('falha ao cadastrar postagem,', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                });
            }
        }
        back()
    }

    function back() {
        history('/postagens/all')
    }


    return (
        <>
            <Container maxWidth="sm" className="topo">
                <form onSubmit={onSubmit}>
                    <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                    <TextField
                        id='titulo' value={postagem.titulo} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} name='titulo' label='Titulo da postagem'
                        variant='outlined'
                        margin='normal'
                        fullWidth />

                    <TextField
                        id='texto' value={postagem.texto} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} name='texto' label='Texto da postagem'
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        multiline
                        minRows={4}
                    />
                    <FormControl fullWidth>
                        <InputLabel id='temaSelect'>Tema</InputLabel>
                        <Select labelId='temaSelect' id='tema'
                            onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                                headers: {
                                    Authorization: token
                                }
                            })}>

                            {temas.map((tema) => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            ))}


                        </Select>
                        <FormHelperText>Escolha um tema para a postagem</FormHelperText>

                        <Button type='submit' variant='contained' color='primary' disabled={tema.id === 0}>Finalizar</Button>
                    </FormControl>
                </form>
            </Container>
        </>
    )
}
export default CadastroPost;