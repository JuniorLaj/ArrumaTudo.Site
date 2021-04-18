import React from 'react'
import { DialogContent, Box, Button,FormHelperText, TextField, Grid, makeStyles } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import apiFuncionario from '../../../../utils/apiFuncionario'
// import { useNavigate } from 'react-router';
const useStyles = makeStyles({
    textField: {
        marginRight:'20vh',
    },

})
function EditarFuncionario(props) {
    const classes = useStyles()
    const funcionario = useSelector(state=> state.selectedItem.funcionario)
    return (
        <DialogContent>
            <Grid>
            <Box display="flex" alignItems="center" >
                <Formik
                    initialValues={{
                        nome: funcionario.nome.toString(),
                        endereco: funcionario.endereco.toString(),
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
                        endereco: Yup.string()
                            .min(20, 'O endereço precisa ter ao menos 20 caracteres.')
                            .max(255)
                            .required('Favor informar o endereço completo'),
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting },
                    ) => {
                        try {
                            await apiFuncionario.put(`/editarfuncionario`,{
                                nome: values.nome,
                                endereco: values.endereco,
                                telefone: values.telefone,
                                salario: values.salario,
                                idFuncionario: funcionario.idfuncionario
                            })
                            setStatus({ success: true });
                            setSubmitting(true);
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
                                required
                                fullWidth
                                className={classes.textField}
                                id="nome"
                                label="Nome Completo"
                                name="nome"
                                autoComplete="nome"
                                autoFocus
                                error={Boolean(errors.nome)}
                                value={values.nome}
                                onChange={handleChange}
                                helperText={errors.nome}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="endereco"
                                label="Endereço Completo"
                                name="endereco"
                                autoComplete="endereco"
                                autoFocus
                                error={Boolean(errors.endereco)}
                                value={values.endereco}
                                onChange={handleChange}
                                helperText={errors.endereco}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
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
                            <div>
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
                            </div>
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
    )
}
export default EditarFuncionario