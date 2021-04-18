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
import { CheckCircleOutline, HourglassEmpty } from '@material-ui/icons';
import ModelOk from '../../../../models/modelOk';

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
    const dispatch = useDispatch()
    const account = useSelector(state => state.account.user.data)

    const [rows, setRows] = useState([])
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


    /*Adicionar*/
    const [openAddServico,setOpenAddServico] = useState()
    const [openModelOkCreate, setOpenModelOkCreate] = useState(false)
//#######################################################

    const handleAdicionarServico = () => {
        setOpenAddServico(true)
    };

    const handleCloseCreate = () => {
        setOpenAddServico(false)
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
        dispatch({ type: 'selecionarEquipamento', payload: tab })
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
        <Button onClick={handleAdicionarServico} variant="contained" color="secondary">
            Adicionar Serviço
        </Button>
        </div>
        <Dialog open={openAddServico} DialogContent={false}
            onClose={handleCloseCreate} aria-labelledby="form-dialog-addFuncionario">
            <DialogTitle id="customized-dialog-addFuncionario">Adicionar Serviço</DialogTitle>
            <CadastrarServico close={handleCloseCreate} getRows = {()=>getRows()}/>
        </Dialog>
        <Dialog open={openModelOkCreate} DialogContent={false}
            onClose={handleCloseModelOkCreate} aria-labelledby="form-sdialog-title">
            <DialogTitle id="customized-dialosg-title">Adicionar Serviço</DialogTitle>
            <ModelOk message ="Serviço adicionado com sucesso!" closeModel={handleCloseModelOkCreate}/>
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
                                <Button onClick={() => handleClickOpenEdit(tab)}>
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
                    <Dialog open={openEdit} DialogContent={false}
                        onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                        <DialogTitle id="customized-dialog-title">Editar Serviço</DialogTitle>
                        <EditarServico close ={() => handleCloseEdit()} getRows = {()=>getRows()}/>
                    </Dialog>
                    <Dialog open={openModelOkEdit} DialogContent={false}
                        onClose={handleCloseModelOkEdit} aria-labelledby="form-sdialog-title">
                        <DialogTitle id="customized-dialosg-title">Editar Serviço</DialogTitle>
                        <ModelOk message ="Serviço editado com sucesso!" closeModel={handleCloseModelOkEdit}/>
                    </Dialog>
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}

export default Servicos
