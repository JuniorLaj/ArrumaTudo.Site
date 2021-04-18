import React, {useState, useCallback, useEffect} from 'react'
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core'
import * as Yup from 'yup';
import { Formik } from 'formik';
import apiCliente from '../../../../utils/apiCliente'
import apiEquipamento from '../../../../utils/apiEquipamento'
import { useSelector } from 'react-redux';

const UseStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '70%',
    },
    formControlTipo: {
        margin: theme.spacing(1),
        minWidth: '30%',
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))
export default function CadastrarServico(props) {
    const classes = UseStyles();
    const account = useSelector(state => state.account.user.data)
    const [rows, setRowsCliente] = useState([])
    const [tipos, setTipos] = useState([])
    const [clienteId,setClienteId] = useState()
    const [type,setType] = useState()

    const handleSelectedType = (tab) => {
        setType(tab)
    }

    const handleSelectedCliente = (tab) => {
        setClienteId(tab.idcliente)
    }


    const getTipos = useCallback(async() => {
        await apiEquipamento.get('/retornatipos')
    .then(response => {
        setTipos(response.data)
    }).catch(error => {
        console.log(error)
    })
    },[setTipos]);

    const getRowsCliente = useCallback(async () => {
        await apiCliente.get('/retornaclientes')
            .then(response => {
                console.log("RESPOSTA",response)
                setRowsCliente(response.data)
            }).catch(error => {
                console.log(error)
            })

    }, [setRowsCliente])

    useEffect(() => {
        getRowsCliente()
        getTipos()       

    }, [getRowsCliente,getTipos])
    return (
        <Grid >
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                <Formik
                    initialValues={{
                        modelo: '',
                        defeito: '',
                    }}
                    validationSchema={Yup.object().shape({
                        defeito: Yup.string().max(255)
                            .required('Favor informar o texto explicando o defeito. '),
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting },
                    ) => {
                        try {
                            await apiEquipamento.post(`/adicionarequipamento`,{
                                idCliente: clienteId,
                                tipo: type,
                                modelo: values.modelo,
                                defeito: values.defeito,
                                idFuncionario: account.idfuncionario,
                            })
                            setStatus({ success: true });
                            setSubmitting(true);
                            props.close()
                        } catch(error){
                            const message =
                            (error.response && error.response.data.message) ||
                            'Alguma coisa aconteceu';
                            setStatus({ success: false });
                            setErrors({ submit: message });
                            setSubmitting(false);
                        }finally {
                            props.getRows()
                        }
                    }}
                >
                    {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
                        
                        <form noValidate className={classes.form} onSubmit={handleSubmit}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="cliente">Cliente</InputLabel>
                                <Select
                                labelId="cliente"
                                id="cliente"
                                error={Boolean(errors.idcliente)}
                                value={values.idcliente}
                                helperText={errors.idcliente}
                                onChange={handleChange}
                                renderValue={(value) => `${value.idcliente} - ${value.nome}`}
                                >
                                 {rows.map((tab) => (
                                    <MenuItem onClick={handleSelectedCliente(tab)} value={tab}>{tab.idcliente} - {tab.nome} </MenuItem>
                                 ))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControlTipo}>
                                <InputLabel id="tipo">Tipo</InputLabel>
                                <Select
                                labelId="tipo"
                                id="tipo"
                                error={Boolean(errors.tipo)}
                                value={type}
                                helperText={errors.tipo}
                                onChange={handleChange}
                                >
                                {tipos.map((tab) => (
                                    <MenuItem onClick={handleSelectedType(tab)} value={tab}>{tab}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rowsMax={4}
                                id="modelo"
                                label="Modelo"
                                name="modelo"
                                autoComplete="modelo"
                                autoFocus
                                error={Boolean(errors.modelo)}
                                value={values.modelo}
                                onChange={handleChange}
                                helperText={errors.modelo}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rowsMax={4}
                                id="defeito"
                                label="Defeito"
                                name="defeito"
                                autoComplete="defeito"
                                autoFocus
                                error={Boolean(errors.defeito)}
                                value={values.defeito}
                                onChange={handleChange}
                                helperText={errors.defeito}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                type="submit"
                                disbled={isSubmitting}
                            >
                                Cadastrar Serviço
                </Button>
                            {errors.submit && (
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            )}
                        </form>
                    )}
                </Formik>
            </Box>
        </Grid>
    )
}