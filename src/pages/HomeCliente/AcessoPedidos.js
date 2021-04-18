import React, { useCallback, useEffect, useState } from 'react';
import { FaRocket } from 'react-icons/fa';
import apiEquip from '../../utils/apiEquipamento'
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import { Box,  } from '@material-ui/core';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
    avatar: {
        background: theme.palette.secondary.main,
        marginBottom: theme.spacing(1),
    },
}))

export default function AcessoPedidos(){
    const classes = useStyles()
    const navigate = useNavigate()
    const [equipsCliente,setEquipsCliente] = useState([])
    const getEquipsCliente = useCallback(async (cpf)=> {
        await apiEquip.get(`/equipamento/cliente/${cpf}`)
        .then(response => {
            setEquipsCliente(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [setEquipsCliente])

    useEffect(() => {
        getEquipsCliente()    
    }, [getEquipsCliente])

    return(
        <>
            <Box mt={2} display="flex" flexDirection="column" alignItems="center" >
                <Avatar className={classes.avatar}>
                    <FaRocket  />
                </Avatar>
                <Typography variant="h5">Acesso aos pedidos</Typography>
                <Formik
                    initialValues={{
                        cpf: '',

                    }}
                    validationSchema={Yup.object().shape({
                        cpf: Yup.string()
                            .max(11)
                            .required('Favor informar o cpf'),
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting },
                    ) => {
                        try {
                                await getEquipsCliente(values.cpf)
                                setStatus({ success: true });
                                setSubmitting(true);
                        } catch (error) {
                            const message =
                                (error.response && error.response.data.message) ||
                                'Alguma coisa aconteceu';

                            setStatus({ success: false });
                            setErrors({ submit: message });
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
                        <form noValidate className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="cpf"
                                label="CPF"
                                name="cpf"
                                autoComplete="CPF"
                                autoFocus
                                error={Boolean(errors.email)}
                                value={values.email}
                                onChange={handleChange}
                                helperText={errors.email}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                type="submit"
                                disbled={isSubmitting}
                            >
                                Procurar
                            </Button>
                            {errors.submit && (
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            )}
                        </form>
                    )}
                </Formik>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" mt ={6}>
            <table BORDER ="1" className={classes.listaCliente} >
            <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Data de Entrada</th>
                <th>Status</th>
            </tr>
            {
                equipsCliente.map((tab) => (
                    <tr>
                    <td>{tab.idequipamento}</td>
                    <td>{tab.tipo}</td>
                    <td>{new Date(tab.dataentrada).toLocaleDateString()}</td>
                    <td>{tab.status? 'Pronto':'Em andamento'}</td>
                </tr>
                ))
            }
            </table>
            </Box>
            <Box mt = {6} display='flex' flexDirection = 'column' alignItems='center'>
                <Button onClick={()=>navigate("/")}>
                    VOLTAR
                </Button>
            </Box>
        </>
    )
}