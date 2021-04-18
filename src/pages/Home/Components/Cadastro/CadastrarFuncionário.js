import React from 'react'
import { DialogContent, Box, Button,FormHelperText, TextField, Grid, makeStyles } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup';
import apiFuncionario from '../../../../utils/apiFuncionario'
import { useSelector } from 'react-redux';

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
                        rua: '',
                        numero: '',
                        bairro: '',
                        cidade: '',
                        estado: '',
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
                                rua: values.rua,
                                numero: values.numero,
                                bairro: values.bairro,
                                cidade: values.cidade,
                                estado: values.estado,
                                telefone: values.telefone,
                                dataNascimento: values.data_nascimento,
                                email: values.email,
                                senha: values.senha,
                                salario: values.salario,
                                idGerente: account.idgerente
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