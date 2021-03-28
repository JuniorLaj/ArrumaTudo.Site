import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useNavigate } from 'react-router';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
const useStyles = makeStyles((theme) => ({

    button: {
        marginTop: theme.spacing(1),
    },
    form: {
        margin: theme.spacing(2, 4),
    },
    loginFunc: {
        right: '0'
    }
}));

export default function FormFuncionario(){
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <Box item md={5}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Typography variant="h5">Acesso Funcionário</Typography>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
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
                        // await dispatch(signIn(values.email, values.password));
                        navigate('/');
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
                            variant="standard"
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
                            variant="standard"
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
                            Entrar
                        </Button>
                        {errors.submit && (
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        )}
                    </form>
                )}
            </Formik>
        </Box>
        </Box>
    )
}