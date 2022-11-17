import React, { useEffect, useState } from "react";
import {Card, CardActions, CardContent, Button, Typography,
} from "@material-ui/core";
import "./DeletarPostagem.css";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Tema from "../../../models/Tema";
import { buscaId, deleteId } from "../../../services/Service";
import Postagem from "../../../models/Postagem";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function DeletarPostagem() {
    let navigate = useNavigate();

    // Para alterar um tema ja existente eu preciso de ajuda para capturar o id e o useParams faz isso
    const { id } = useParams<{ id: string }>();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )
    //Incializar vazio para que o usuário possa preencher e mandarmos para o nosso banco de dados -> memória temporária
    const [post, setPost] = useState<Postagem>();

    // Se caso o usuário não estiver logado, ele terá o efeito de dizer que precisa estar logado e vai redirecionar para a tela de login
    useEffect(() => {
        if (token == "") {
            toast.error('você precisa estar logado', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });            navigate("/login");
        }
    }, [token]);

    // !== é o simbolo de diferente
    useEffect(() => {
        if (id !== undefined) {
            findById(id);
        }
    }, [id]);

    //Serve para buscar o nosso tema pelo id
    async function findById(id: string) {
        buscaId(`/postagens/${id}`, setPost, {
            headers: {
                Authorization: token,
            },
        });
    }

    //A função sim vai nos redirecionar para a tela de temas e vai acionar o metodo deleteId, vai ver se tem o token para que seja autorizada a exclusão
    function sim() {
        navigate("/postagens/all");
        deleteId(`/postagens/${id}`, {
            headers: {
                Authorization: token,
            },
        });
        toast.success('postagem deletada com sucesso', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });    }

    //Nos direcionará para a página temas e manterá o tema
    function nao() {
        navigate("/postagens/all");
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar a Postagem:
                            </Typography>
                            <Typography color="textSecondary">
                                {post?.titulo}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
                            <Box mx={2}>
                                <Button
                                    onClick={sim}
                                    variant="contained"
                                    className="marginLeft"
                                    size="large"
                                    color="primary"
                                >
                                    Sim
                                </Button>
                            </Box>
                            <Box mx={2}>
                                <Button
                                    onClick={nao}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                >
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}
export default DeletarPostagem;