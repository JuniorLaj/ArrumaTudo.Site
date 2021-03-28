import React from 'react'
import { useSelector } from 'react-redux'
function ApresentaFuncionário() {
    const func = useSelector(state => state.selectedItem.funcionario)
    return (
        <>
            {func ? (
                <>
                    <h1>{func.cpf}</h1>
                    <h1>{func.nome}</h1>
                    <h1>{func.Salário}</h1>
                    <h1>{func.Jornada}</h1>
                </>
            ) : (
                <h1>Selecione um Funcionário.</h1>
            )
            }

        </>
    )
}

export default ApresentaFuncionário