import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router'
import Home from '../pages/Home'

function GuestRoute({element: Component, ...rest}) {
    return(
        <Route {...rest} element={(
            Component
        )
    }/>
    )
}

export default GuestRoute