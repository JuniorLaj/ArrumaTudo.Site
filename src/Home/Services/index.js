import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography, makeStyles } from '@material-ui/core'
import Serviços from './Tabelas/Serviços'
import Funcionarios from './Tabelas/Funcionarios'
import Clientes from './Tabelas/Clientes'
import ApresentaEquipamento from './Apresentação/ApresentaEquipamento'
import ApresentaFuncionário from './Apresentação/ApresentaFuncionário'
import ApresentaCliente from './Apresentação/ApresentaCliente'

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
            <Box >
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
            <Box >
                <TabPanel value={tab} index={0}>
                    <ApresentaCliente />
                </TabPanel>

                <TabPanel value={tab} index={1}>
                    <ApresentaFuncionário />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <ApresentaEquipamento />
                </TabPanel>
            </Box>
        </Box>
    )
}
