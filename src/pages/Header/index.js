import React, { useState, useRef } from 'react'
import { Box, makeStyles, Typography, Avatar, AppBar, Toolbar, Menu, MenuItem, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'


const useStyles = makeStyles({
    AppBar: {
        boxShadow: 'none',
        display: 'flex',
        // height: '5%',
        backgroundColor: 'green',
        paddingBottom: 30,
    },
    grow: {
        flexGrow: 1,
    },
    avatar: {
        // float: 'right',
        position: 'absolute',
    }
})

function Header() {
    const classes = useStyles()
    const [isOpen, setisOpen] = useState(false)
    const ref = useRef()
    const navigate = useNavigate()
    const account = useSelector(state => state.account.user.data)
    const handleOpen = () => {
        setisOpen(true)
    }
    const handleClose = () => {
        setisOpen(false)
    }

    return (
        <Box className={classes.AppBar}>

            <AppBar style={{ boxShadow: 'none' }} position="fixed" color="inherit">
                <Toolbar>
                    <Button onClick={() => navigate("/")}>
                        <h2> ARRUMA TUDO</h2>
                    </Button>
                    <div></div>
                    <div className={classes.grow} />
                    <div>
                        <Typography variant="body1">{account.nome}</Typography>
                        <Typography variant="">{account.idfuncionario === account.idgerente? 'Gerente' : 'Funcionario'}</Typography>
                    </div>
                    <div className={classes.userSection}>
                        <Box ml={2} />
                        <Avatar
                            ref={ref}
                            onClick={handleOpen}
                            alt={account.nome} 
                            src='/'
                        >
                        </Avatar>

                        <Menu
                            anchorEl={ref.current}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={isOpen}
                            onClose={handleClose}
                            getContentAnchorEl={() => {
                                return false
                            }}
                        >
                            <MenuItem onClick={() => navigate("/")}>Deslogar</MenuItem>
                        </Menu>
                    </div>

                </Toolbar>
            </AppBar >
        </Box>
    )
}

export default Header