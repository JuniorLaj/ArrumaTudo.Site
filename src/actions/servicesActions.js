import authServices from "../services/AuthServices"

export const SERVICE_SUCESS = '@SERVICE/SERVICE_SUCESS'
// export const SILENT_LOGIN = '@ACCOUNT/SILENT_LOGIN'
// export const SIGN_OUT = '@ACCOUNT/SIGN_OUT'

const cadastrarServiço = (modelo, defeito, cpf) => {
    return async (dispatch) => {
        // console.log("token:",authService.getToken())
        const service = await authServices.cadastrarServiço(modelo, defeito, cpf)
        dispatch({
            type: SERVICE_SUCESS,
            payload: {
                service
            }
        })
    }
}

export { cadastrarServiço }