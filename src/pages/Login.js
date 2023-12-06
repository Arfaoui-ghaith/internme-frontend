import React from 'react';
import {
    useNavigate,
    Link
} from "react-router-dom";

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuthDispatch } from './../context/auth'

const image = Math.floor(Math.random() * 23);

function Login() {
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();
    const [data, setData] = React.useState({});

    const change = (index,value) => {
        if(value === ""){
            let user = data;
            delete user[index];
            setData(user);
        }else {
            let user = {...data};
            user[index] = value;
            setData(user);
        }
    }

    const loginUser = () => {
        toast.promise(
            axios
                .post('https://internme-eccc19ef962f.herokuapp.com/api/users/login', data)
                .then(res => {
                    dispatch({ type:'LOGIN', payload: res.data.token });
                }),
            {
                loading: 'Loading...',
                success: 'Success',
                error: (err) => err.response.data.message,
            }
        ).then(res => setTimeout (navigate('/'),5000));
    }



    return (
        <React.Fragment>
            <main className="main-content  mt-0">
                <section>
                    <div className="page-header min-vh-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                    <div className="card card-plain mt-8">
                                        <div className="card-header pb-0 text-left bg-transparent">
                                            <h3 className="font-weight-bolder text-info text-gradient">
                                                Welcome back
                                            </h3>
                                            <p className="mb-0">Enter your email and password and let's boost your carrier!</p>
                                        </div>
                                        <div className="card-body">
                                            <form >
                                                <label>Email</label>
                                                <div className="mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                        aria-label="Email"
                                                        aria-describedby="email-addon"
                                                        onChange={(e) => change('email',e.target.value)}
                                                    />
                                                </div>
                                                <label>Password</label>
                                                <div className="mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        aria-label="Password"
                                                        aria-describedby="password-addon"
                                                        onChange={(e) => change('password',e.target.value)}
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <p className="mb-1 text-sm mx-auto">
                                                        Forget password?
                                                        <Link
                                                            to="/forget"
                                                            className="text-info text-gradient font-weight-bold"
                                                        >
                                                            click
                                                        </Link>
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn bg-gradient-info w-100 mt-4 mb-0"
                                                        onClick={() => loginUser()}
                                                    >
                                                        Sign in
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                            <p className="mb-4 text-sm mx-auto">
                                                Don't have an account?
                                                <Link
                                                    to="/register"
                                                    className="text-info text-gradient font-weight-bold"
                                                >
                                                    Sign up
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                        <div
                                            className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                                            style={{
                                                backgroundImage:
                                                    `url("../assets/img/curved-images/curved${image}.jpg")`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Toaster
                position="top-center"
            />

        </React.Fragment>
    )
}

export default Login;