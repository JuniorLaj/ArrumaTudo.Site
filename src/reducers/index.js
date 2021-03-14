import selectedItemTable from './selectedItemTable'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    // 'notifications': notificationsReducer
    'selectedItem': selectedItemTable
})

export default rootReducer;