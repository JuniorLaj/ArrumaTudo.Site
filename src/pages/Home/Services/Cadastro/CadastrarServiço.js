import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, FormHelperText, Grid, makeStyles, TextField } from '@material-ui/core'
import * as Yup from 'yup';
import { Formik } from 'formik';
import { cadastrarServiço } from '../../../../actions/servicesActions';
const UseStyles = makeStyles({

})
export default function CadastrarServiço() {
    const classes = UseStyles();
    // const dispatch = useDispatch();
    return (
        <Grid >
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Formik
                    initialValues={{
                        modelo: '',
                        defeito: '',
                        // work: '',
                        cpf: '',
                        // password: '',
                    }}
                    validationSchema={Yup.object().shape({
                        modelo: Yup.string().max(255)
                            .min(4, 'O modelo precisa ter ao menos 4 caracteres.')
                            .required('Favor informar o modelo.'),
                        defeito: Yup.string().max(255)
                            .required('Favor informar um defeito. '),
                        cpf: Yup.string()
                            .max(255)
                            .required('Favor informar o cpf de um cliente'),
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting },
                    ) => {
                        try {
                            // await dispatch(cadastrarServiço(values.modelo, values.defeito, values.work, values.cpf, values.password));
                            // navigate('/');
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
                            {/* <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="work"
                                label="Data de Entrada"
                                name="work"
                                autoComplete="work"
                                autoFocus
                                error={Boolean(errors.work)}
                                value={values.work}
                                onChange={handleChange}
                                helperText={errors.work}
                            /> */}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="cpf"
                                label="Cliente (CPF)"
                                name="cpf"
                                autoComplete="cpf"
                                autoFocus
                                error={Boolean(errors.cpf)}
                                value={values.cpf}
                                onChange={handleChange}
                                helperText={errors.cpf}
                            />
                            {/* <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={values.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                            /> */}
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                type="submit"
                                disbled={isSubmitting}
                            >
                                Cadastrar Equipamento
                </Button>
                            {errors.submit && (
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            )}
                            {/* <Grid container>
                                <Grid item>
                                    <Link>Esqueceu sua senha?</Link>
                                </Grid>
                                <Grid item>
                                    <Link>Não tem uma conta? Registre-se</Link>
                                </Grid>
                            </Grid> */}
                        </form>
                    )}
                </Formik>
                {/* <Copyright /> */}
            </Box>
        </Grid>
    )
}