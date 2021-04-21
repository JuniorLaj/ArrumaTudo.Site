import React from 'react'
import { DialogContent, Box, Button,FormHelperText, TextField, Grid, makeStyles} from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import apiFuncionario from '../../../utils/apiFuncionario'


const useStyles = makeStyles((theme)=>({
    textField: {
        marginRight: theme.spacing(14),
    },
    textFielParteBaixo: {
        marginRight: theme.spacing(10),
    },
}))

function EditarFuncionario(props) {
    const classes = useStyles()
    const funcionario = useSelector(state=> state.selectedItem.funcionario)
    return (
        <>
        <DialogContent>
            <Grid>
            <Box display="flex" alignItems="center" >
                <Formik
                    initialValues={{
                        cpf: funcionario.cpf.toString(),
                        nome: funcionario.nome.toString(),
                        rua: funcionario.rua.toString(),
                        numero: funcionario.numero,
                        bairro: funcionario.bairro.toString(),
                        cidade: funcionario.cidade.toString(),
                        estado: funcionario.estado.toString(),
                        telefone: funcionario.telefone.toString(),
                        data_nascimento: new Date(funcionario.data_nascimento).toLocaleDateString(),
                        salario: funcionario.salario,
                    }}
                    validationSchema={Yup.object().shape({
                        nome: Yup.string().max(255)
                            .min(10, 'O nome precisa ter ao menos 10 caracteres')
                            .required('Favor informar o nome completo'),
                        telefone: Yup.string().max(11,'Telefone tem mais de 11 dígitos.')
                            .required('Favor informar um Telefone. '),
                        rua: Yup.string()
                        .max(255)
                        .required('Favor informar a rua.'),
                        bairro: Yup.string()
                            .max(50)
                            .required('Favor informar o bairro.'),
                        cidade: Yup.string()
                        .max(50)
                        .required('Favor informar a cidade.'),
                        estado: Yup.string()
                        .max(2,'Coloque somente a sigla do estado.')
                        .required('Favor informar o estado.'),
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting },
                    ) => {
                        try {
                            await apiFuncionario.put(`/editarfuncionario`,{
                                nome: values.nome,
                                rua: values.rua,
                                numero: values.numero,
                                bairro: values.bairro,
                                cidade: values.cidade,
                                estado: values.estado,
                                telefone: values.telefone,
                                salario: values.salario,
                                idFuncionario: funcionario.idfuncionario
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
                        <form noValidate  onSubmit={handleSubmit}>
                             <TextField
                                variant="outlined"
                                margin="normal"
                                disabled
                                id="cpf"
                                label="CPF"
                                name="cpf"
                                autoComplete="cpf"
                                autoFocus
                                error={Boolean(errors.nome)}
                                value={values.cpf}
                                onChange={handleChange}
                                helperText={errors.nome}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="nome"
                                label="Nome completo"
                                name="nome"
                                autoComplete="nome"
                                autoFocus
                                error={Boolean(errors.nome)}
                                value={values.nome}
                                onChange={handleChange}
                                helperText={errors.nome}
                            />
                            <div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="telefone"
                                label="Telefone para contato"
                                name="telefone"
                                autoComplete="Telefone"
                                autoFocus
                                error={Boolean(errors.telefone)}
                                value={values.telefone}
                                onChange={handleChange}
                                helperText={errors.telefone}
                            />
                            </div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="rua"
                                label="Rua"
                                name="rua"
                                autoComplete="rua"
                                autoFocus
                                error={Boolean(errors.rua)}
                                value={values.rua}
                                onChange={handleChange}
                                helperText={errors.rua}
                            />
                             <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                className={classes.textFielParteBaixo}
                                id="numero"
                                label="Número"
                                name="numero"
                                autoComplete="numero"
                                autoFocus
                                error={Boolean(errors.numero)}
                                value={values.numero}
                                onChange={handleChange}
                                helperText={errors.numero}
                            />
                             <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="bairro"
                                label="Bairro"
                                name="bairro"
                                autoComplete="bairro"
                                autoFocus
                                error={Boolean(errors.bairro)}
                                value={values.bairro}
                                onChange={handleChange}
                                helperText={errors.bairro}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                className={classes.textFielParteBaixo}
                                id="cidade"
                                label="Cidade"
                                name="cidade"
                                autoComplete="cidade"
                                autoFocus
                                error={Boolean(errors.cidade)}
                                value={values.cidade}
                                onChange={handleChange}
                                helperText={errors.cidade}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="estado"
                                label="Estado"
                                name="estado"
                                autoComplete="estado"
                                autoFocus
                                error={Boolean(errors.estado)}
                                value={values.estado}
                                onChange={handleChange}
                                helperText={errors.estado}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="salario"
                                label="Salário"
                                name="salario"
                                autoComplete="salario"
                                autoFocus
                                error={Boolean(errors.salario)}
                                value={values.salario}
                                onChange={handleChange}
                                helperText={errors.salario}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                // className={classes.button}
                                type="submit"
                                disbled={isSubmitting}
                            >
                                Editar
                            </Button>
                            {errors.submit && (
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            )}
                        </form>
                    )}
                </Formik>
            </Box>
            </Grid>
        </DialogContent>
        </>
    )
}
export default EditarFuncionario