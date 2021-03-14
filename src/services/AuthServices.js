import axios from '../utils/axios'

class AuthServices {
    //outras funções

    cadastrarServiço = (modelo, defeito, cpf) => {

        return (new Promise((resolve, reject) => {

            axios.post('/v1/auth/cadastrarServiço', { modelo, defeito, cpf })
                .then(response => {
                    if (response.data.service) {

                        // this.setToken(response.data.token)
                        resolve(response.data.service)
                    } else {
                        reject(response.data)
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