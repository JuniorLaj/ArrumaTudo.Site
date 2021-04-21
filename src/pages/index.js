import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Popover from '@material-ui/core/Popover';
import { useDispatch } from 'react-redux';
import { signIn } from '../actions/accountActions';
import { Button, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        flexDirection: 'row',
        display: 'flex'
    },

    image: {
        backgroundImage: 'url(/imgs/background.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'none',
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    button: {
        marginTop: theme.spacing(1),
    },
    form: {
        margin: theme.spacing(2, 4),
    },
    loginFunc: {
        right: '15'
    },
    pedidosClienteTexto: {
        marginLeft: '5vh',
    },
    listaCliente: {
        // display: 'flex',
        // flexDirection: 'row'
    },
    buttonLogin: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'right'
    }
}));


 function HomeCliente(){
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;

    return(
        <>
        <Box>
            <Box clasname ={classes.loginFunc}>
                <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                >
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
                        await dispatch(signIn(values.email, values.password));
                        navigate('/home')
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
                </Popover>
            </Box>
            <center>
                <h1> ARRUMA TUDO - A sua loja de manutenção! Resolvemos o problema do seu equipamento!</h1>
            </center>
            <center>
                <h1>Manutenção em equipamentos em geral</h1>
                <img src="furadeira.jpg" alt=""/>
                <h1>Manutenção em computadores e seus periféricos</h1>
                <img src="manutencao-notebook-zona-zul.jpg" alt=""/>
                <h1>Manutenção de máquinas de lavar de todos os tipos!</h1>
                <img src="maquina-lavar.jpg" alt=""/>

            </center>
        </Box>
        <Box className={classes.pedidosClienteTexto}>
            <center>
                <h2>
                Para verificar o estado dos equipamentos que enviou para manutenção,
                </h2>
                <Button onClick={()=>navigate("/acessopedidos")} color = 'primary'><h2>CLIQUE AQUI</h2> </Button>
            </center>
        </Box>
        <Box textAlign="right" >
            <Tooltip  title="Área do Funcionário">
                <IconButton aria-label="Add">
                    <ExitToAppIcon color='secondary' onClick={handleClick}  />
                </IconButton>
            </Tooltip>
        </Box>
    </>
    )
}

export default HomeCliente