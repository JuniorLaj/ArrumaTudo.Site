import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import apiCliente from '../../../../utils/apiCliente'
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
import EditarCliente from '../Apresentação/EditarCliente';
import CadastrarCliente from '../Cadastro/CadastrarCliente'

const useStyles = makeStyles({
    buttonAdd: {
        Align: 'right'
    },
    table: {
        width: '100%',
    }
})

function Clientes() {
    const classes = useStyles();
    const [rows, setRows] = useState([])
    const [openAddCliente,setOpenAddCliente] = useState()
    const dispatch = useDispatch()
    const [open, setOpen] = useState()
    const handleClickOpen = (tab) => {
        dispatch({ type: 'selecionarCliente', payload: tab })
        setOpen(true);
    };
    const handleClose = () => {
        setOpenAddCliente(false)
        setOpen(false);
    };

    const handleAdicionarCliente = () => {
        setOpenAddCliente(true)
    };

    const getRows = useCallback(async () => {
        await apiCliente.get('/retornaclientes')
            .then(response => {
                console.log("RESPOSTA",response)
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
        <Button onClick={handleAdicionarCliente} variant="contained" color="secondary">
            Adicionar Cliente
        </Button>
        </div>
        <Dialog open={openAddCliente} DialogContent={false}
            onClose={handleClose} aria-labelledby="form-dialog-addCliente">
            <DialogTitle id="customized-dialog-addCliente">Adicionar Cliente</DialogTitle>
            <CadastrarCliente getRows = {()=>getRows()}/>
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
                        <TableCell align = 'center'>OPÇÕES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    rows.map((tab) => (
                        <TableRow>
                            {/* <tr> */}
                            <TableCell>{tab.idcliente}</TableCell>
                            <TableCell>{tab.nome}</TableCell>
                            <TableCell>{tab.endereco}</TableCell>
                            <TableCell>{tab.telefone}</TableCell>
                            <TableCell align='center'>
                                {new Date(tab.data_nascimento).toLocaleDateString()}
                            </TableCell>
                            <TableCell align = 'center' >
                                <Button onClick={() => handleClickOpen(tab)}>
                                    <EditIcon  color='secondary'/>
                                </Button>
                                <Button onClick={async ()=>{
                                    try{
                                        await apiCliente.delete(`/deletecliente/${tab.idcliente}`)
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
                        <DialogTitle id="customized-dialog-title">Editar Cliente</DialogTitle>
                        <EditarCliente getRows = {()=>getRows()}/>
                    </Dialog>
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}

export default Clientes
