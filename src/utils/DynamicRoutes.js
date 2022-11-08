import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from '../context/auth'

export default function DynamicRoutes(props) {

    const { user, email, reset_token } = useAuthState();

    console.log(email,props.verification,props.verification && email != null);

    if(props.verification){
        if(email){
            return <Outlet />
        }else{
            return <Navigate to="/forget" />
        }
    }

    if(props.reset){
        if(reset_token){
            return <Outlet />
        }else{
            return <Navigate to="/forget" />
        }
    }

    /*if (props.authenticated && !user){
        return <Navigate to="/login" />
    } else if(props.guest && user) {
        return <Navigate to="/" />
    } else {
        return <Route element={props.element} {...props} />
    }*/

    return user ? <Outlet /> : <Navigate to="/login" />;

}