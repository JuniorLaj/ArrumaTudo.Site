
const INITIAL_STATE = {
    equipamento: null
}
const selectedItemTable = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ("selecionarEquipamento"): {
            return {
                ...state,
                equipamento: action.payload
            }
        } case ("selecionarFuncionario"): {
            return {
                ...state,
                funcionario: action.payload
            }
        } case ("selecionarCliente"): {
            return {
                ...state,
                cliente: action.payload
            }
        } default: {
            return state;
        }
    }
}

export default selectedItemTable