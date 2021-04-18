import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

// import { useDispatch } from 'react-redux';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Popover from '@material-ui/core/Popover';
import FormFuncionario from './FormFuncionario';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';

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
                <div className={classes.buttonLogin}>
                <Tooltip  title="Área do Funcionário">
                    <IconButton aria-label="Add">
                        {/* <FilterListIcon /> */}
                        <ExitToAppIcon color='secondary' onClick={handleClick}  />
                    </IconButton>
                </Tooltip>
                </div>
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
    </>
    )
}

export default HomeCliente