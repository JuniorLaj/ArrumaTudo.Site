import React, { useState } from 'react'
import { Box, Tabs, Tab, makeStyles, Typography } from '@material-ui/core'
import Funcionarios from './Funcionarios';
import Serviços from './Serviços';
import Header from './Header';

const useStyles = makeStyles({

    parteBaixo: {
        display: 'flex',
        flexDirection: 'row',
        padding: 50,
        backgroundColor: 'gray',
        // heigth: '500px',
        // width: '100%',
    },

    tab: {
        marginRight: 100,
        // width: '20%',
        // backgroundColor: 'white',
        display: 'flex',
        // height: '200px',
        flexDirection: 'column',
    },

    ul: {
        listStyle: 'none',
        padding: 20,
    },
    li: {
        borderWidth: 1,
        borderStyle: 'solid',
    },
    lista: {
        width: '50%',
        // height: '500px',
        marginRight: 100,
        // backgroundColor: "red",
    },
    cadastro: {
        // marginRight: '50',
        backgroundColor: 'purple',
        width: '30%',
        // height: '20%',
    },


})
function Home() {
    const classes = useStyles()
    const [tab, setTab] = useState(0)

    const handleChange = (event, newValue) => {
        setTab(newValue)
    }

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
    return (
        <>
            <Header />

            <Box className={classes.parteBaixo}>

                <Box className={classes.tab}>
                    {/* <select name="Galpões">
                        <option value="funcionarios">Galpão 1</option>
                        <option value="Produtos">Galpão 2</option>
                    </select> */}
                    <Tabs orientation="horizontal" value={tab} onChange={handleChange}>
                        <Tab label="Funcionários" />
                        <Tab label="Serviços" />
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        <Funcionarios />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <Serviços />
                    </TabPanel>

                </Box>

                {/* <Box className={classes.lista}> */}
                {/* <div className={classes.Adicionar} >
                        ADICIONAR ITEM (FUNCIONÁRIO OU ITEM)
                    </div>
                    <Table_Funcs />
                </Box> */}

                <Box className={classes.cadastro}>
                    <TabPanel value={tab} index={0}>
                        Cadastro Funcionário
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        Cadastro Serviço
                    </TabPanel>
                </Box>
            </Box>

        </>
    )
}

export default Home