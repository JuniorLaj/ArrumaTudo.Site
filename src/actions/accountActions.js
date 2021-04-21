import authService from "../services/AuthServices"
export const LOGIN_SUCESS = '@ACCOUNT/LOGIN_SUCESS'
export const SIGN_OUT = '@ACCOUNT/SIGN_OUT'

const signIn = (email, password) => {
    return async (dispatch) => {
        // console.log("token:",authService.getToken())
        const user = await authService.signIn(email, password)
        dispatch({
            type: LOGIN_SUCESS,
            payload: {
                user: user
            }
        })
    }
}


export { signIn }
