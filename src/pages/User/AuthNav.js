import React, {useCallback} from "react";
import {Link, useNavigate} from 'react-router-dom'
import { useAuthState } from './../../context/auth'
import { useAuthDispatch } from './../../context/auth'

function AuthNav() {
    const { user } = useAuthState();
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const handleOnClick = useCallback(() => navigate("/login", {replace: true}), [navigate]);

    const logout = () => {
        dispatch({ type:'LOGOUT' });
        handleOnClick();
    }
    return(
        <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 border-radius-xl position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky"
            id="navbarBlur"
            style={{ backgroundColor: "#f6f6f6" }}
            navbar-scroll="true"
        >
            <div className="container-fluid py-1 px-3">
                <nav aria-label="">
                    <Link to={"/"}>
                        <img src="https://i.ibb.co/rcKvzsq/Screenshot-from-2023-12-06-02-15-52.png"
                             className="img-fluid rounded-2"
                             style={{ height: "40px" }}
                             alt="..."/>
                    </Link>
                </nav>
                <div
                    className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                    id="navbar"
                >
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                        <div className="input-group">

                        </div>
                    </div>
                    {
                        user ?
                            <ul className="navbar-nav  justify-content-end">
                                <li className="nav-item d-flex align-items-center">
                                    <Link
                                        to="/profile"
                                        className="nav-item d-flex align-items-center"
                                    >
                                        <i className="fa fa-user me-sm-1" />
                                        <span className="d-sm-inline d-none me-3">Profile</span>
                                    </Link>
                                </li>
                                <li className="nav-item d-flex align-items-center">
                                    <Link
                                        className="nav-item d-flex align-items-center"
                                        onClick={logout}
                                    >
                                        <i className="fa fa-sign-out me-sm-1" />
                                        <span className="d-sm-inline d-none me-3">Log out</span>
                                    </Link>
                                </li>


                            </ul>


                            :

                            <ul className="navbar-nav  justify-content-end">
                                <li className="nav-item d-flex align-items-center">
                                    <Link
                                        to="/login"
                                        className="nav-item d-flex align-items-center"
                                    >

                                        <span className="d-sm-inline d-none me-3">Sign in</span>
                                    </Link>
                                </li>
                                <li className="nav-item d-flex align-items-center">
                                    <Link
                                        to={"/register"}
                                        className="nav-item d-flex align-items-center"
                                    >

                                        <span className="d-sm-inline d-none me-3">Sign up</span>
                                    </Link>
                                </li>


                            </ul>
                    }

                </div>
            </div>
        </nav>
    )
}

export default AuthNav;