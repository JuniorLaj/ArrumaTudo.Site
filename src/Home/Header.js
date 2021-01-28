import React, { useState, useRef } from 'react'
import { Box, makeStyles, Typography, Avatar, AppBar, Toolbar, Menu, MenuItem } from '@material-ui/core'


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

export default function Header() {
    const classes = useStyles()
    const [isOpen, setisOpen] = useState(false)
    const ref = useRef()

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
                        <h2> TRABALHO BD</h2>
                    </div>
                    <div></div>
                    <div className={classes.grow} />
                    <div>
                        <Typography variant="body1">José Martins da Rosa Júnior</Typography>
                        <Typography variant="">Funcionário</Typography>
                    </div>
                    <div className={classes.userSection}>
                        <Box ml={2} />
                        {/* <SvgIcon className={classes.bell}>
                <Bell></Bell>
            </SvgIcon> */}

                        <Avatar
                            ref={ref}
                            onClick={handleOpen}
                            alt="Remy Sharp" //account.name
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