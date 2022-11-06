import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from '../context/auth'

export default function DynamicRoutes(props) {
    const { user } = useAuthState();

    /*if (props.authenticated && !user){
        return <Navigate to="/login" />
    } else if(props.guest && user) {
        return <Navigate to="/" />
    } else {
        return <Route element={props.element} {...props} />
    }*/

    return user ? <Outlet /> : <Navigate to="/login" />;

}