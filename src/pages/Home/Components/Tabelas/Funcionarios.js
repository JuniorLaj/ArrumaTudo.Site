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

const useStyles = makeStyles({
    buttonAdd: {
        Align: 'right'
    },
    table: {
        width: '100%',
    }
})

function Funcionarios() {
    const classes = useStyles();
    const [rows, setRows] = useState([])
    const [openAddFuncionario,setOpenAddFuncionario] = useState()
    const account = useSelector(state => state.account.user.data)
    const dispatch = useDispatch()
    const [open, setOpen] = useState()
    const handleClickOpen = (tab) => {
        dispatch({ type: 'selecionarFuncionario', payload: tab })
        console.log(tab)
        setOpen(true);
    };
    const handleClose = () => {
        setOpenAddFuncionario(false)
        setOpen(false);
    };

    const handleAdicionarFuncionario = () => {
        setOpenAddFuncionario(true)
    };

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


    return(
        <>
        <div className={classes.buttonAdd}>
        <Button onClick={handleAdicionarFuncionario} variant="contained" color="secondary">
            Adicionar Funcionário
        </Button>
        </div>
        <Dialog open={openAddFuncionario} DialogContent={false}
            onClose={handleClose} aria-labelledby="form-dialog-addFuncionario">
            <DialogTitle id="customized-dialog-addFuncionario">Adicionar Funcionário</DialogTitle>
            <CadastrarFuncionario getRows = {()=>getRows()}/>
        </Dialog>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>CPF</TableCell>
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
                            <TableCell>{tab.endereco}</TableCell>
                            <TableCell>{tab.telefone}</TableCell>
                            <TableCell align='center'>
                                {new Date(tab.datanascimento).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{tab.salario}</TableCell>
                            <TableCell align = 'center' >
                                <Button onClick={() => handleClickOpen(tab)}>
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
                    <Dialog open={open} DialogContent={false}
                        onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="customized-dialog-title">Editar Funcionário</DialogTitle>
                        <EditarFuncionario getRows = {()=>getRows()}/>
                    </Dialog>
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}

export default Funcionarios
