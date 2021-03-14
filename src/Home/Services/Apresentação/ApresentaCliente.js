import React from 'react'
import { useSelector } from 'react-redux'
function ApresentaCliente() {
    const cliente = useSelector(state => state.selectedItem.cliente)
    return (
        <>
            {cliente ? (
                <>
                    <h1>{cliente.cpf}</h1>
                    <h1>{cliente.nome}</h1>
                    <h1>{cliente.celular}</h1>
                    <h1>{cliente.data_nascimento}</h1>
                    <h1>{cliente.endereço}</h1>
                    <h1>{cliente.data_inicio}</h1>

                </>
            ) : (
                <h1>Selecione um cliente.</h1>
            )
            }

        </>
    )
}

export default ApresentaCliente