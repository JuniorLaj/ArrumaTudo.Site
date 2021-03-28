import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Popover from '@material-ui/core/Popover';
import FormFuncionario from './FormFuncionario';
import { FaRocket } from 'react-icons/fa';
import { List } from '@material-ui/core';
// import { signIn } from '../../actions/accountActions';
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
    avatar: {
        background: theme.palette.primary.main,
        marginBottom: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(1),
    },
    form: {
        margin: theme.spacing(2, 4),
    },
    loginFunc: {
        right: '0'
    },
    pedidosClienteTexto: {
        marginLeft: '5vh',
    },
    listaCliente: {
        // display: 'flex',
        // flexDirection: 'row'
    }
}));


 function SignIn(){
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
                <Tooltip  title="Área do Funcionário">
                    <IconButton aria-label="Add">
                        {/* <FilterListIcon /> */}
                        <ExitToAppIcon color='secondary' onClick={handleClick}  />
                    </IconButton>
                </Tooltip>
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
                   <FormFuncionario />
                </Popover>
            </Box>
            <center>
                <h1> ARRUMA TUDO</h1>
                <h2>A sua loja de manutenção! Resolvemos o problema do seu equipamento em um prazo máximo de 7 dias!</h2>
            </center>
            <center>

                <img src="logo192.png"/>
                <img src="logo192.png"/>
                <img src="logo192.png"/>
                <img src="logo192.png"/>
                <img src="logo192.png"/>
                <img src="logo192.png"/>


            </center>
        </Box>
        <Box className={classes.pedidosClienteTexto}>
            <h2>
            Para verificar o estado dos equipamentos que enviou para manutenção, digite aqui seu cpf ou o número do seu pedido.
            </h2>
        </Box>
        <Box className={classes.root}>
            <Box item md={5}>
                <Box display="flex" flexDirection="column" alignItems="center" >
                    <Avatar className={classes.avatar}>
                        <FaRocket />
                    </Avatar>
                    <Typography variant="h5">Acesso aos pedidos</Typography>
                    <Formik
                        initialValues={{
                            cpf: '',

                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .max(11)
                                .required('Favor informar o cpf'),
                        })}
                        onSubmit={async (
                            values,
                            { setErrors, setStatus, setSubmitting },
                        ) => {
                            try {
                                // await dispatch(signIn(values.email, values.password));
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
            </Box>

                <table BORDER ="1" className={classes.listaCliente} >
                    <tr>
                        <th>Número pedido</th>

                        <th>Modelo</th>

                        <th>Data de Entrada</th>

                        <th>Data de entrega (prevista)</th>

                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>05424</td>
                        <td>RTX 04541</td>
                        <td>21/03</td>
                        <td>28/03</td>
                        <td>Em andamento</td>

                    </tr>
                    {/* result.map((tab) => {
                        <tr>
                        <td>tab.id</td>
                        <td>tab.modelo</td>
                        <td>tab.data_entrada</td>
                        <td>tab.data_entrega</td>
                        <td>tab.status</td>

                    </tr>
                    }) */}

                </table>
        </Box>
            </>
        )
            
}

export default SignIn