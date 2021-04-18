import axios from '../utils/axios'

class QueryService {

    cadastrarEquipamento = (modelo, defeito, cpf) => {

        return (new Promise((resolve, reject) => {

            axios.post('/v1/auth/cadastrarServiço', { modelo, defeito, cpf })
                .then(response => {
                    if (response.data.service) {
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

const authServices = new QueryService();

export default authServices;