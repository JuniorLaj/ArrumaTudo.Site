import React from 'react'
import { Route } from 'react-router'

function GuestRoute({element: Component, ...rest}) {
    return(
        <Route {...rest} element={
            Component
    }/>
    )
}

export default GuestRoute