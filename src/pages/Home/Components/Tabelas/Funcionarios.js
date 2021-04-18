import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import apiFuncionario from '../../../../utils/apiFuncionario'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Dialog, DialogTitle,  } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditarFuncionario from '../Apresentação/EditarFuncionario';
import CadastrarFuncionario from '../Cadastro/CadastrarFuncionário'
import ModelOk from '../../../../models/modelOk';

const useStyles = makeStyles({
    buttonAdd: {
        Align: 'right'
    },
    table: {
        width: '100%',
    }
})

function Funcionarios() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const account = useSelector(state => state.account.user.data)
    
    const [rows, setRows] = useState([])
    const getRows = useCallback(async () => {
        await apiFuncionario.get(`/funcionarios/${account.idgerente}`)
            .then(response => {
                setRows(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [setRows])

    useEffect(() => {
        getRows()       

    }, [getRows])

    /*Adicionar*/
    const [openAddFuncionario,setOpenAddFuncionario] = useState()
    const [openModelOkCreate, setOpenModelOkCreate] = useState(false)

//#######################################################

    const handleAdicionarFuncionario = () => {
        setOpenAddFuncionario(true)
    };

    const handleCloseAddFuncionario = () => {
        setOpenAddFuncionario(false)
        setOpenModelOkCreate(true)
    };

    const handleCloseModelOkCreate = () => {
        setOpenModelOkCreate(false);
    };
//#######################################################


    /*Editar*/
    const [openEdit, setOpenEdit] = useState()
    const [openModelOkEdit, setOpenModelOkEdit] = useState(false)

//#######################################################
    const handleClickOpenEdit = (tab) => {
        dispatch({ type: 'selecionarFuncionario', payload: tab })
        setOpenEdit(true);
    };
    
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setOpenModelOkEdit(true);    
    };

    const handleCloseModelOkEdit = () => {
        setOpenModelOkEdit(false);
    };
//#######################################################

    return(
        <>
        <div className={classes.buttonAdd}>
        <Button onClick={handleAdicionarFuncionario} variant="contained" color="secondary">
            Adicionar Funcionário
        </Button>
        </div>
        <Dialog open={openAddFuncionario} DialogContent={false}
            onClose={handleCloseAddFuncionario} aria-labelledby="form-dialog-addFuncionario">
            <DialogTitle id="customized-dialog-addFuncionario">Adicionar Funcionário</DialogTitle>
            <CadastrarFuncionario close={handleCloseAddFuncionario} getRows = {()=>getRows()}/>
        </Dialog>
        <Dialog open={openModelOkCreate} DialogContent={false}
            onClose={handleCloseModelOkCreate} aria-labelledby="form-sdialog-title">
            <DialogTitle id="customized-dialosg-title">Adicionar Funcionário</DialogTitle>
            <ModelOk message ="Funcionário adicionado com sucesso!" closeModel={handleCloseModelOkCreate}/>
        </Dialog>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>NOME</TableCell>
                        <TableCell>ENDEREÇO</TableCell>
                        <TableCell>TELEFONE</TableCell>
                        <TableCell align= 'center'>DATA DE NASCIMENTO</TableCell>
                        <TableCell>SALÁRIO R$</TableCell>
                        <TableCell align = 'center'>OPÇÕES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    rows.map((tab) => (
                        <TableRow>
                            {/* <tr> */}
                            <TableCell>{tab.idfuncionario}</TableCell>
                            <TableCell>{tab.nome}</TableCell>
                            <TableCell>{`Rua ${tab.rua}, nº ${tab.numero},
                                         Bairro ${tab.bairro}, ${tab.cidade}-${tab.estado}`}</TableCell>
                            <TableCell>{tab.telefone}</TableCell>
                            <TableCell align='center'>
                                {new Date(tab.datanascimento).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{tab.salario}</TableCell>
                            <TableCell align = 'center' >
                                <Button onClick={() => handleClickOpenEdit(tab)}>
                                    <EditIcon  color='secondary'/>
                                </Button>
                                <Button onClick={async ()=>{
                                    try{
                                        await apiFuncionario.delete(`/deletarfuncionario/${tab.idfuncionario}`)
                                    }catch(error){
                                        console.log(error)
                                    }finally{
                                        getRows()
                                    }
                                }}
                                    >
                                    <DeleteIcon color='primary'/>
                                </Button>
                            </TableCell>
                            
                            </TableRow>
                    ))}
                    <Dialog open={openEdit} DialogContent={false}
                        onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                        <DialogTitle id="customized-dialog-title">Editar Funcionário</DialogTitle>
                        <EditarFuncionario close={() => handleCloseEdit()} getRows = {()=>getRows()}/>
                    </Dialog>

                    <Dialog open={openModelOkEdit} DialogContent={false}
                        onClose={handleCloseModelOkEdit} aria-labelledby="form-sdialog-title">
                        <DialogTitle id="customized-dialosg-title">Editar Funcionário</DialogTitle>
                        <ModelOk message ="Funcionário editado com sucesso!" closeModel={handleCloseModelOkEdit}/>
                    </Dialog>
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}

export default Funcionarios
