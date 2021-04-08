import React from 'react'
import { Box, Button, FormHelperText, Grid, makeStyles, TextField } from '@material-ui/core'
import * as Yup from 'yup';
import { Formik } from 'formik';
const UseStyles = makeStyles({

})
export default function CadastrarFuncionário() {
    const classes = UseStyles();
    return (
        <Grid >
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Formik
                    initialValues={{
                        fullname: '',
                        username: '',
                        work: '',
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object().shape({
                        fullname: Yup.string().max(255)
                            .min(10, 'O nome precisa ter ao menos 10 caracteres')
                            .required('Favor informar o nome completo'),
                        username: Yup.string().max(255)
                            .required('Favor informar um UserName. '),
                        work: Yup.string().max(255).required('Favor informar uma atividade. '),
                        email: Yup.string()
                            .email('Favor informar um email válido. ')
                            .max(255)
                            .required('Favor informar o email'),
                        password: Yup.string()
                            .max(255).min(7, 'O password precisa ter ao menos 7 caractéres. ')
                            .required('Favor informar o password. '),
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting },
                    ) => {
                        try {
                            // await dispatch(signUp(values.fullname, values.username, values.work, values.email, values.password));
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
                                id="fullname"
                                label="fullname"
                                name="fullname"
                                autoComplete="fullname"
                                autoFocus
                                error={Boolean(errors.fullname)}
                                value={values.fullname}
                                onChange={handleChange}
                                helperText={errors.fullname}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="UserName"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                error={Boolean(errors.username)}
                                value={values.username}
                                onChange={handleChange}
                                helperText={errors.username}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="work"
                                label="Área de Trabalho"
                                name="work"
                                autoComplete="work"
                                autoFocus
                                error={Boolean(errors.work)}
                                value={values.work}
                                onChange={handleChange}
                                helperText={errors.work}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={Boolean(errors.email)}
                                value={values.email}
                                onChange={handleChange}
                                helperText={errors.email}
                            />
                            <TextField
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
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                type="submit"
                                disbled={isSubmitting}
                            >
                                Cadastrar
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