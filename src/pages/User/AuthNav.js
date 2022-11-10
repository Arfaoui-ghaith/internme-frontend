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
            navbar-scroll="true"
        >
            <div className="container-fluid py-1 px-3">
                <nav aria-label="">
                    <Link to={"/"}>
                        <img src="https://res.cloudinary.com/dztythssn/image/upload/c_scale,w_150/v1667860285/internme_argnkp.png"
                             className="img-fluid"
                             alt="..."/>
                    </Link>
                </nav>
                <div
                    className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                    id="navbar"
                >
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                        <div className="input-group">
                              <span className="input-group-text text-body">
                                <i className="fas fa-search" aria-hidden="true" />
                              </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type here..."
                                />
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