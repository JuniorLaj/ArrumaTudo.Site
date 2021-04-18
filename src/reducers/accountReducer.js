import { LOGIN_SUCESS, SIGN_OUT } from "../actions/accountActions"

const INITIAL_STATE = {
    user: null
}
const accountReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCESS: {
            return {
                ...state,
                user: action.payload.user
            }
        }
        case SIGN_OUT: {
            return {
                ...state,
                user: null,
            }
        }
        default: {
            return state;
        }
    }
}
export default accountReducer;