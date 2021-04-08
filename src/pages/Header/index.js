import React, { useState, useRef } from 'react'
import { Box, makeStyles, Typography, Avatar, AppBar, Toolbar, Menu, MenuItem } from '@material-ui/core'
import { useSelector } from 'react-redux'


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
                    <div>
                        <h2> ARRUMA TUDO</h2>
                    </div>
                    <div></div>
                    <div className={classes.grow} />
                    <div>
                        <Typography variant="body1">{account.nome}</Typography>
                        <Typography variant="">{account.cpf === account.cpf_gerente? 'Gerente' : 'Funcionario'}</Typography>
                    </div>
                    <div className={classes.userSection}>
                        <Box ml={2} />
                        {/* <SvgIcon className={classes.bell}>
                <Bell></Bell>
            </SvgIcon> */}

                        <Avatar
                            ref={ref}
                            onClick={handleOpen}
                            alt={account.nome} //account.name
                            src='/'
                        // src={account.user && account.user.avatar}
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
                            <MenuItem /*onClick={handleSignOut}*/>Deslogar</MenuItem>
                        </Menu>
                    </div>

                </Toolbar>
            </AppBar >
        </Box>
    )
}

export default Header