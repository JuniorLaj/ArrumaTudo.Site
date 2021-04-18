import React from 'react'
import { DialogContent, Box, Button,FormHelperText, TextField, Grid, makeStyles } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup';
import apiCliente from '../../../../utils/apiCliente'

const useStyles = makeStyles({
    textField: {
        marginRight:'20vh',
    },

})
function CadastrarCliente(props) {
    const classes = useStyles()
    return (
        <DialogContent>
            <Grid>
            <Box display="flex" alignItems="center" >
                <Formik
                    initialValues={{
                        cpf: '',
                        nome: '',
                        telefone: '',
                        data_nascimento: '',
                        rua: '',
                        numero: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
                    }}
                    validationSchema={Yup.object().shape({
                        cpf: Yup.string()
                        .min(11,'CPF de 11 dígitos.')
                        .required('Informe seu CPF'),
                        nome: Yup.string().max(50)
                            .min(10, 'O nome precisa ter ao menos 10 caracteres')
                            .required('Favor informar o nome completo'),
                        telefone: Yup.string().max(11,'Telefone tem mais de 11 dígitos.')
                            .required('Favor informar um Telefone. '),
                        data_nascimento: Yup.string().required('Favor informar uma data de nascimento. '),
                        rua: Yup.string()
                            .max(255)
                            .required('Favor informar a rua.'),
                        bairro: Yup.string()
                            .max(255)
                            .required('Favor informar o bairro.'),
                        cidade: Yup.string()
                        .max(255)
                        .required('Favor informar a cidade.'),
                        estado: Yup.string()
                        .max(2,'Coloque somente a sigla do estado.')
                        .required('Favor informar o estado.'),
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting },
                    ) => {
                        try {
                            await apiCliente.post(`/adicionarcliente`,{
                                cpf: values.cpf,
                                nome: values.nome,
                                data_nascimento: values.data_nascimento,
                                telefone: values.telefone,
                                rua: values.rua,
                                numero: values.numero,
                                bairro: values.bairro,
                                cidade: values.cidade,
                                estado: values.estado,
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
                             <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="cpf"
                                label="CPF"
                                name="cpf"
                                autoComplete="cpf"
                                autoFocus
                                error={Boolean(errors.nome)}
                                value={values.cpf}
                                onChange={handleChange}
                                helperText={errors.nome}
                            />
                            <div>

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                className={classes.textField}
                                id="nome"
                                label="Nome completo"
                                name="nome"
                                autoComplete="nome"
                                autoFocus
                                error={Boolean(errors.nome)}
                                value={values.nome}
                                onChange={handleChange}
                                helperText={errors.nome}
                            />
                            {/* <div className={classes.space}/> */}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type='date'
                                id="data_nascimento"
                                label="Data de Nascimento"
                                name="data_nascimento"
                                autoComplete="Data de Nascimento"
                                autoFocus
                                error={Boolean(errors.data_nascimento)}
                                value={values.data_nascimento}
                                onChange={handleChange}
                                helperText={errors.data_nascimento}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            </div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="telefone"
                                label="Telefone para contato"
                                name="telefone"
                                autoComplete="Telefone"
                                autoFocus
                                error={Boolean(errors.telefone)}
                                value={values.telefone}
                                onChange={handleChange}
                                helperText={errors.telefone}
                            />
                            
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="rua"
                                label="Rua"
                                name="rua"
                                autoComplete="rua"
                                autoFocus
                                error={Boolean(errors.rua)}
                                value={values.rua}
                                onChange={handleChange}
                                helperText={errors.rua}
                            />
                             <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="numero"
                                label="Número"
                                name="numero"
                                autoComplete="numero"
                                autoFocus
                                error={Boolean(errors.numero)}
                                value={values.numero}
                                onChange={handleChange}
                                helperText={errors.numero}
                            />
                             <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="bairro"
                                label="Bairro"
                                name="bairro"
                                autoComplete="bairro"
                                autoFocus
                                error={Boolean(errors.bairro)}
                                value={values.bairro}
                                onChange={handleChange}
                                helperText={errors.bairro}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="cidade"
                                label="Cidade"
                                name="cidade"
                                autoComplete="cidade"
                                autoFocus
                                error={Boolean(errors.cidade)}
                                value={values.cidade}
                                onChange={handleChange}
                                helperText={errors.cidade}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="estado"
                                label="Estado"
                                name="estado"
                                autoComplete="estado"
                                autoFocus
                                error={Boolean(errors.estado)}
                                value={values.estado}
                                onChange={handleChange}
                                helperText={errors.estado}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                // className={classes.button}
                                type="submit"
                                disbled={isSubmitting}
                            >
                                CADASTRAR CLIENTE
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
export default CadastrarCliente