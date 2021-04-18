import React from 'react'
import { DialogContent, Box, Button,FormHelperText, TextField, Grid, makeStyles } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup';
import apiFuncionario from '../../../../utils/apiFuncionario'
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
const useStyles = makeStyles({
    textField: {
        marginRight:'20vh',
    },
    textData: {
        flexDirection:'column',
        float:'right',
    }
})
function CadastrarFuncionario(props) {
    const account = useSelector(state => state.account.user.data)
    const classes = useStyles()
    return (
        <DialogContent>
            <Grid>
            <Box display="flex" alignItems="center" >
                <Formik
                    initialValues={{
                        cpf: '',
                        nome: '',
                        endereco: '',
                        telefone: '',
                        data_nascimento: '',
                        email: '',
                        senha: '',
                        salario: '',
                    }}
                    validationSchema={Yup.object().shape({
                        cpf: Yup.string()
                        .min(11,'CPF de 11 dígitos.')
                        .required('Informe seu CPF'),
                        nome: Yup.string().max(255)
                            .required('Favor informar o nome completo'),
                        endereco: Yup.string()
                            .min(20, 'O endereço precisa ter ao menos 20 caracteres.')
                            .max(255)
                            .required('Favor informar o endereço completo'),
                        telefone: Yup.string().max(11,'Telefone tem mais de 11 dígitos.')
                            .required('Favor informar um Telefone. '),
                        data_nascimento: Yup.string().required('Favor informar uma data de nascimento. '),
                        email: Yup.string().max(50).min(20).required("Informe um email."),
                        senha: Yup.string().max(10,'Máximo 10 caracteres na senha.')
                        .min(5, 'Mínimo 5 caracteres na senha.').required('Favor informar uma senha.')
                    })}
                    onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting },
                    ) => {
                        try {
                            await apiFuncionario.post(`/adicionarfuncionario`,{
                                cpf: values.cpf,
                                nome: values.nome,
                                endereco: values.endereco,
                                telefone: values.telefone,
                                dataNascimento: values.data_nascimento,
                                email: values.email,
                                senha: values.senha,
                                salario: values.salario,
                                idGerente: account.idgerente
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
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="cpf"
                                label="CPF (somente dígitos)"
                                name="cpf"
                                autoComplete="cpf"
                                autoFocus
                                error={Boolean(errors.cpf)}
                                value={values.cpf}
                                onChange={handleChange}
                                helperText={errors.cpf}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                className={classes.textField}
                                id="nome"
                                label="Nome Completo"
                                name="nome"
                                autoComplete="nome"
                                autoFocus
                                error={Boolean(errors.nome)}
                                value={values.nome}
                                onChange={handleChange}
                                helperText={errors.nome}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="endereco"
                                label="Endereço Completo"
                                name="endereco"
                                autoComplete="endereco"
                                autoFocus
                                error={Boolean(errors.endereco)}
                                value={values.endereco}
                                onChange={handleChange}
                                helperText={errors.endereco}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
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
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={Boolean(errors.email)}
                                value={values.email}
                                onChange={handleChange}
                                helperText={errors.email}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                id="senha"
                                label="Senha"
                                name="senha"
                                autoComplete="senha"
                                autoFocus
                                error={Boolean(errors.senha)}
                                value={values.senha}
                                onChange={handleChange}
                                helperText={errors.senha}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="salario"
                                label="Salário"
                                name="salario"
                                autoComplete="salario"
                                autoFocus
                                error={Boolean(errors.salario)}
                                value={values.salario}
                                onChange={handleChange}
                                helperText={errors.salario}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                // className={classes.button}
                                type="submit"
                                disbled={isSubmitting}
                            >
                                CADASTRAR FUNCIONÁRIO
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
export default CadastrarFuncionario