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
import ModelOk from '../../../../models/modelOk';

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
    const dispatch = useDispatch()
    const [rows, setRows] = useState([])

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


    /*Adicionar*/
    const [openAddCliente,setOpenAddCliente] = useState()
    const [openModelOkCreate, setOpenModelOkCreate] = useState(false)

//#######################################################

    const handleAdicionarCliente = () => {
        setOpenAddCliente(true)
    };

    const handleCloseCreate = () => {
        setOpenAddCliente(false)
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
        dispatch({ type: 'selecionarCliente', payload: tab })
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
        <Button onClick={handleAdicionarCliente} variant="contained" color="secondary">
            Adicionar Cliente
        </Button>
        </div>
        <Dialog open={openAddCliente} DialogContent={false}
            onClose={handleCloseCreate} aria-labelledby="form-dialog-addCliente">
            <DialogTitle id="customized-dialog-addCliente">Adicionar Cliente</DialogTitle>
            <CadastrarCliente close={handleCloseCreate} getRows = {()=>getRows()}/>
        </Dialog>
        <Dialog open={openModelOkCreate} DialogContent={false}
            onClose={handleCloseModelOkCreate} aria-labelledby="form-sdialog-title">
            <DialogTitle id="customized-dialosg-title">Adicionar Cliente</DialogTitle>
            <ModelOk message ="Cliente adicionado com sucesso!" closeModel={handleCloseModelOkCreate}/>
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
                            <TableCell>{`Rua ${tab.rua}, nº ${tab.numero},
                                         Bairro ${tab.bairro}, ${tab.cidade}-${tab.estado}`}</TableCell>
                            <TableCell>{tab.telefone}</TableCell>
                            <TableCell align='center'>
                                {new Date(tab.data_nascimento).toLocaleDateString()}
                            </TableCell>
                            <TableCell align = 'center' >
                                <Button onClick={() => handleClickOpenEdit(tab)}>
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
                    <Dialog open={openEdit} DialogContent={false}
                        onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                        <DialogTitle id="customized-dialog-title">Editar Cliente</DialogTitle>
                        <EditarCliente close={() => handleCloseEdit()} getRows = {()=>getRows()}/>
                    </Dialog>
                    <Dialog open={openModelOkEdit} DialogContent={false}
                        onClose={handleCloseModelOkEdit} aria-labelledby="form-sdialog-title">
                        <DialogTitle id="customized-dialosg-title">Editar Cliente</DialogTitle>
                        <ModelOk message ="Cliente editado com sucesso!" closeModel={handleCloseModelOkEdit}/>
                    </Dialog>
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}

export default Clientes
