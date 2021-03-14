import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography, makeStyles } from '@material-ui/core'
import Serviços from './Tabelas/Serviços'
import Funcionarios from './Tabelas/Funcionarios'
import CadastrarServiço from './Cadastro/CadastrarServiço'
import CadastrarFuncionário from './Cadastro/CadastrarFuncionário'
import { useSelector } from 'react-redux'
import Clientes from './Tabelas/Clientes'
const useStyles = makeStyles({

    parteBaixo: {
        display: 'flex',
        flexDirection: 'row',
        padding: 50,
        backgroundColor: 'gray',
        // heigth: '500px',
        // width: '100%',
    },
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
    // const services = useSelector(state => state.services);
    const [tab, setTab] = useState(0)

    const handleChange = (event, newValue) => {
        setTab(newValue)
    }
    return (
        <Box className={classes.parteBaixo}>
            <Box className={classes.tab}>
                {/* <select name="Galpões">
                        <option value="funcionarios">Galpão 1</option>
                        <option value="Produtos">Galpão 2</option>
                    </select> */}
                <Tabs orientation="horizontal" value={tab} onChange={handleChange}>
                    <Tab label="Clientes" />
                    <Tab label="Funcionários" />
                    <Tab label="Serviços" />

                </Tabs>

                <TabPanel value={tab} index={0}>
                    <Clientes />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Funcionarios />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <Serviços />
                </TabPanel>

            </Box>
            {/* <Box >
                <TabPanel value={tab} index={1}>
                    <CadastrarFuncionário />
                </TabPanel>

                <TabPanel value={tab} index={2}>
                    <CadastrarServiço />
                </TabPanel>
            </Box> */}

        </Box>
    )
}
