import React, {useState} from 'react'
import {makeStyles, DialogContent, Box, Button,FormHelperText, TextField, Grid, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import apiEquipamento from '../../../utils/apiEquipamento'

const useStyles = makeStyles((theme) => ({
    spaceStatus: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}))
function EditarServico(props) {
    const equipamento = useSelector(state => state.selectedItem.equipamento)
    const classes = useStyles()
    const [status,setStatus] = useState(equipamento.status)
    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
    }
    return (
        <DialogContent>
            <Grid>
            <Box display="flex" alignItems="center" >
                <Formik
                    initialValues={{
                        tipo: equipamento.tipo.toString(),
                        modelo: equipamento.modelo.toString(),
                        defeito: equipamento.defeito.toString(),
                        status: equipamento.status,
                    }}
                    validationSchema={Yup.object().shape({
                        modelo: Yup.string().max(50,'Máximo 50 caracteres neste campo.')
                            .required('Favor informar o modelo do equipamento. '),
                        defeito: Yup.string().min(10).max(100,'Máximo 100 caracteres neste campo.')
                            .required('Favor informar o defeito. '),
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting },
                    ) => {
                        try {
                            await apiEquipamento.put(`/editarequipamento`,{
                                modelo: values.modelo,
                                defeito: values.defeito,
                                status: status,
                                idEquipamento: equipamento.idequipamento
                            })
                            setStatus({ success: true });
                            setSubmitting(true);
                            props.close()
                        } catch(error){
                            const message =
                            (error.response && error.response.data.message) ||
                            'Alguma coisa aconteceu';
                            setStatus({ success: false });
                            setErrors({ submit: message });
                            setSubmitting(false);
                        }finally {
                            props.getRows()
                        }
                    }}
                >
                    {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
                        <form noValidate  onSubmit={handleSubmit}>
                             <div>
                                 <TextField
                                    variant="outlined"
                                    margin="normal"
                                    disabled
                                    id="id"
                                    label="ID"
                                    name="id"
                                    autoComplete="id"
                                    autoFocus
                                    defaultValue={equipamento.idequipamento}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    disabled
                                    id="data"
                                    label="Data de Entrada"
                                    name="data"
                                    autoComplete="data"
                                    autoFocus
                                    defaultValue={ new Date(equipamento.dataentrada).toLocaleDateString()}
                                />
                            </div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                disabled
                                fullWidth
                                type='tipo'
                                id="tipo"
                                label="Tipo"
                                name="tipo"
                                autoComplete="Tipo"
                                autoFocus
                                error={Boolean(errors.tipo)}
                                value={values.tipo}
                                onChange={handleChange}
                                helperText={errors.tipo}
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rowsMax={4}
                                id="modelo"
                                label="Modelo"
                                name="modelo"
                                autoComplete="modelo"
                                autoFocus
                                error={Boolean(errors.modelo)}
                                value={values.modelo}
                                onChange={handleChange}
                                helperText={errors.modelo}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rowsMax={4}
                                id="defeito"
                                label="Defeito"
                                name="defeito"
                                autoComplete="defeito"
                                autoFocus
                                error={Boolean(errors.defeito)}
                                value={values.defeito}
                                onChange={handleChange}
                                helperText={errors.defeito}
                            />
                            <Box className={classes.spaceStatus}>
                            <InputLabel id="status">Status</InputLabel>
                                <Select
                                labelId="status"
                                id="status"
                                error={Boolean(errors.tipo)}
                                value={status? "Consertado" : "Em manutenção"}
                                helperText={errors.tipo}
                                onChange={handleChangeStatus}
                                renderValue={(value) => `${value}`}
                                >
                                <MenuItem value={false}>Em manutenção</MenuItem>
                                <MenuItem value={true}>Consertado</MenuItem>
                                </Select>
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                disbled={isSubmitting}
                            >
                                Editar
                            </Button>
                            {errors.submit && (
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            )}
                        </form>
                    )}
                </Formik>
            </Box>
            </Grid>

        </DialogContent>
    )
}
export default EditarServico