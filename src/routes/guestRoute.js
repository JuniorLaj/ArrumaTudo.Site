import React from 'react'
// import { useSelector } from 'react-redux'
import { Route } from 'react-router'
import Home from '../pages'
// import authService from '../services/authService'

function GuestRoute({element: Component, ...rest}) {
    // const account = useSelector(state => state.account);
    // const isAuthenticated = Boolean(account.user)
    const isAuthenticated = false
    console.log("Constante isauthenticated setada para false")
    return(
        <Route {...rest} element={
            Component
        //     (
        //     isAuthenticated
        //     ? Component
        //     : <Home/>
        // )
    }/>
    )
}

export default GuestRoute