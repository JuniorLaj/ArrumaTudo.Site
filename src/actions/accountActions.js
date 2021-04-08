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

const signOut = () => {
    return async (dispatch) => {
        await authService.signOut()
        dispatch({
            type: SIGN_OUT,
        })
    }
}

// const setUserData = () => {
//     return async (dispatch) => {
//         const user = await authService.signInWithToken()

//         dispatch({
//             type: SILENT_LOGIN,
//             payload: {
//                 user,
//             }
//         })
//     }
// }
export { signIn, signOut }
