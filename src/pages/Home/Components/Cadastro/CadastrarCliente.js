import React from 'react'
import { DialogContent, Box, Button,FormHelperText, TextField, Grid, makeStyles } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup';
import apiCliente from '../../../../utils/apiCliente'
// import { useNavigate } from 'react-router';
const useStyles = makeStyles({
    textField: {
        marginRight:'20vh',
    },

})
function CadastrarCliente(props) {
    const classes = useStyles()
    return (
        <DialogContent>
            <Grid>
            <Box display="flex" alignItems="center" >
                <Formik
                    initialValues={{
                        cpf: '',
                        nome: '',
                        telefone: '',
                        data_nascimento: '',
                        endereco: '',
                    }}
                    validationSchema={Yup.object().shape({
                        nome: Yup.string().max(255)
                            .min(10, 'O nome precisa ter ao menos 10 caracteres')
                            .required('Favor informar o nome completo'),
                        telefone: Yup.string().max(11,'Telefone tem mais de 11 dígitos.')
                            .required('Favor informar um Telefone. '),
                        data_nascimento: Yup.string().required('Favor informar uma data de nascimento. '),
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
                            await apiCliente.post(`/adicionarcliente`,{
                                cpf: values.cpf,
                                nome: values.nome,
                                data_nascimento: values.data_nascimento,
                                telefone: values.telefone,
                                endereco: values.endereco,
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
                            <div>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                className={classes.textField}
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
                            {/* <div className={classes.space}/> */}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type='date'
                                id="data_nascimento"
                                label="Data de Nascimento"
                                name="data_nascimento"
                                autoComplete="Data de Nascimento"
                                autoFocus
                                error={Boolean(errors.data_nascimento)}
                                value={values.data_nascimento}
                                onChange={handleChange}
                                helperText={errors.data_nascimento}
                            />
                            </div>
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
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                // className={classes.button}
                                type="submit"
                                disbled={isSubmitting}
                            >
                                CADASTRAR CLIENTE
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
export default CadastrarCliente