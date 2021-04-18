import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Serviços from './Components/Tabelas/Serviços'
import Funcionarios from './Components/Tabelas/Funcionarios'
import Clientes from './Components/Tabelas/Clientes'

const useStyles = makeStyles({

    parteBaixo: {
        display: 'flex',
        flexDirection: 'row',
        padding: 50,

    },
    Abas: {
        // backgroundColor:'purple',
    }
})
export default function Cadastros() {
    function TabPanel(props) {
        const { children, value, index, ...other } = props
        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`wrapped-tabpanel-${index}`}
                aria-labelledby={`wrapped-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        )
    }
    const classes = useStyles()
    const account = useSelector(state => state.account.user.data)
    const [tab, setTab] = useState(0)

    const handleChange = (event, newValue) => {
        setTab(newValue)
    }
    return (
        <Box className={classes.parteBaixo}>
            <Box className={classes.Abas} >
                <Tabs orientation="horizontal" value={tab} onChange={handleChange}>
                    <Tab label="Clientes" />
                    <Tab label="Funcionários" />
                    <Tab label="Serviços" />
                </Tabs>
                <TabPanel value={tab} index={0}>
                    <Clientes />
                </TabPanel>
                {(
                    account.idfuncionario ===account.idgerente
                    ?
                        <TabPanel value={tab} index={1}>
                            <Funcionarios />
                        </TabPanel>
                    :
                    <></>
                )}
                <TabPanel value={tab} index={2}>
                    <Serviços />
                </TabPanel>

            </Box>
        </Box>
    )
}
