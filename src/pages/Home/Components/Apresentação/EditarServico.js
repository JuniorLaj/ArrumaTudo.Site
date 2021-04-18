import React from 'react'
import { DialogContent, Box, Button,FormHelperText, TextField, Grid, makeStyles } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import apiEquipamento from '../../../../utils/apiEquipamento'

const useStyles = makeStyles({
    textField: {
        marginRight:'20vh',
    },

})
function EditarServico(props) {
    const classes = useStyles()
    const equipamento = useSelector(state => state.selectedItem.equipamento)
    console.log(equipamento)
    return (
        <DialogContent>
            <Grid>
            <Box display="flex" alignItems="center" >
                <Formik
                    initialValues={{
                        idequipamento: equipamento.idequipamento,
                        tipo: equipamento.tipo.toString(),
                        defeito: equipamento.defeito.toString(),
                        data: new Date(equipamento.dataentrada.toString()),
                        status: equipamento.status,
                    }}
                    validationSchema={Yup.object().shape({
                        defeito: Yup.string().min(10).max(100,'Máximo 100 caracteres neste campo.')
                            .required('Favor informar o defeito. '),
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting },
                    ) => {
                        try {
                            await apiEquipamento.put(`/editarequipamento`,{
                                tipo: values.tipo,
                                defeito: values.defeito,
                                status: values.status,
                                idEquipamento: equipamento.idequipamento
                            })
                            setStatus({ success: true });
                            setSubmitting(true);
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
                                    required
                                    type="date"
                                    id="data"
                                    label="Data de Entrada"
                                    name="data"
                                    autoComplete="data"
                                    autoFocus
                                    error={Boolean(errors.data)}
                                    value={values.data}
                                    onChange={handleChange}
                                    helperText={errors.data}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                />
                            </div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
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