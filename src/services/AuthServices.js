import apiFuncionario from '../utils/apiFuncionario'

class AuthServices {
    //outras funções

    signIn = (email, password) => {

        // pesquisar sobre: "promisse javascript"

        return (new Promise((resolve, reject) => {
            apiFuncionario.post('/auth/login', { email, password })
            .then(response => {
                    if (response.data.user) {
                        console.log(response)
                        resolve(response.data.user)
                    } else {
                        reject(response.data.error)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        }))
    }

}

const authServices = new AuthServices();

export default authServices;