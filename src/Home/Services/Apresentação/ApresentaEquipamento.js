import React from 'react'
import { useSelector } from 'react-redux'
function ApresentaEquipamento() {
    const equip = useSelector(state => state.selectedItem.equipamento)
    return (
        <>
            {equip ? (
                <>
                    <h1>{equip.id}</h1>
                    <h1>{equip.modelo}</h1>
                    <h1>{equip.defeito}</h1>
                    <h1>{equip.status}</h1>
                    <h1>{equip.funcionario}</h1>

                </>
            ) : (
                <h1>Selecione um equipamento.</h1>
            )
            }

        </>
    )
}

export default ApresentaEquipamento