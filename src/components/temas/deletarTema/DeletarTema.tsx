import React, { useEffect, useState } from "react";
import {Card, CardActions, CardContent, Button, Typography,
} from "@material-ui/core";
import "./DeletarTema.css";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Tema from "../../../models/Tema";
import { buscaId, deleteId } from "../../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function DeletarTema() {
    let navigate = useNavigate();

    // Para alterar um tema ja existente eu preciso de ajuda para capturar o id e o useParams faz isso
    const { id } = useParams<{ id: string }>();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )
    //Incializar vazio para que o usuário possa preencher e mandarmos para o nosso banco de dados -> memória temporária
    const [tema, setTema] = useState<Tema>();

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
        buscaId(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        });
    }

    //A função sim vai nos redirecionar para a tela de temas e vai acionar o metodo deleteId, vai ver se tem o token para que seja autorizada a exclusão
    function sim() {
        navigate("/temas/all");
        deleteId(`/temas/${id}`, {
            headers: {
                Authorization: token,
            },
        });
        toast.success('tema deletado com sucesso!', {
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
        navigate("/temas/all");
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar o Tema:
                            </Typography>
                            <Typography color="textSecondary">
                                {tema?.descricao}
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
export default DeletarTema;