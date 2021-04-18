import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import apiEquipamento from '../../../../utils/apiEquipamento'
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
import EditarServico from '../Apresentação/EditarServico';
import CadastrarServico from '../Cadastro/CadastrarServico'
import { CheckCircleOutline, Done, HourglassEmpty } from '@material-ui/icons';

const useStyles = makeStyles({
    buttonAdd: {
        Align: 'right'
    },
    table: {
        width: '100%',
    }
})

function Servicos() {
    const classes = useStyles();
    const [rows, setRows] = useState([])
    const [openAddServico,setOpenAddServico] = useState()
    const account = useSelector(state => state.account.user.data)
    const dispatch = useDispatch()
    const [open, setOpen] = useState()
    const handleClickOpen = (tab) => {
        dispatch({ type: 'selecionarEquipamento', payload: tab })
        setOpen(true);
    };
    const handleClose = () => {
        setOpenAddServico(false)
        setOpen(false);
    };

    const handleAdicionarServico = () => {
        setOpenAddServico(true)
    };

    const getRows = useCallback(async () => {
        await apiEquipamento.get(`/funcionarios/${account.idfuncionario}`)
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
        <Button onClick={handleAdicionarServico} variant="contained" color="secondary">
            Adicionar Serviço
        </Button>
        </div>
        <Dialog open={openAddServico} DialogContent={false}
            onClose={handleClose} aria-labelledby="form-dialog-addFuncionario">
            <DialogTitle id="customized-dialog-addFuncionario">Adicionar Serviço</DialogTitle>
            <CadastrarServico getRows = {()=>getRows()}/>
        </Dialog>
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>TIPO</TableCell>
                        <TableCell>DEFEITO</TableCell>
                        <TableCell align= 'center'>DATA DE ENTRADA</TableCell>
                        <TableCell>STATUS</TableCell>
                        <TableCell align = 'center'>OPÇÕES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    rows.map((tab) => (
                        <TableRow>
                            {/* <tr> */}
                            <TableCell>{tab.idequipamento}</TableCell>
                            <TableCell>{tab.tipo}</TableCell>
                            <TableCell>{tab.defeito}</TableCell>
                            <TableCell align = 'center'> {new Date(tab.dataentrada).toLocaleDateString()}</TableCell>
                            <TableCell align = 'center'>{(
                            tab.status
                            ?
                            <CheckCircleOutline/>
                            :
                            <HourglassEmpty/>
                            )}</TableCell>
                            <TableCell align = 'center' >
                                <Button onClick={() => handleClickOpen(tab)}>
                                    <EditIcon  color='secondary'/>
                                </Button>
                                <Button onClick={async ()=>{
                                    try{
                                        await apiEquipamento.delete(`/deleteEquipamento/${tab.idequipamento}`)
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
                        <DialogTitle id="customized-dialog-title">Editar Serviço</DialogTitle>
                        <EditarServico getRows = {()=>getRows()}/>
                    </Dialog>
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}

export default Servicos
