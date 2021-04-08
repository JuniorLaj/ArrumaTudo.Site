import selectedItemTable from './selectedItemTable'
import { combineReducers } from 'redux'
import accountReducer from './accountReducer';

const rootReducer = combineReducers({
    'account': accountReducer,
    'selectedItem': selectedItemTable
})

export default rootReducer;