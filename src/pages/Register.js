import React from 'react';
import {
    useNavigate,
    Link
} from "react-router-dom";

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const image = Math.floor(Math.random() * 23);

function Register() {

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

    const addUser = () => {
        toast.promise(
            axios
                .post('http://localhost:9000/api/users/signin', data)
                .then(),
            {
                loading: 'Loading...',
                success: 'Success',
                error: (err) => err.response.data.message,
            }
        ).then(res => setTimeout (navigate('/login'),5000));
    }

    return (
    <React.Fragment>
            <main className="main-content  mt-0">
                <section className="min-vh-100 mb-4">
                    <div
                        className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
                        style={{
                            backgroundImage: `url("../assets/img/curved-images/curved${image}.jpg")`
                        }}
                    >
                        <span className="mask bg-gradient-dark opacity-6" />
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5 text-center mx-auto">
                                    <h1 className="text-white mb-2 mt-5">Welcome!</h1>
                                    <p className="text-lead text-white">
                                        Use these awesome forms to login or create new account in your
                                        project for free.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row mt-lg-n10 mt-md-n11 mt-n10">
                            <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                                <div className="card z-index-0">
                                    <div className="card-header text-center pt-4">
                                        <h5>Register Now!</h5>
                                    </div>

                                    <div className="card-body">
                                        <form >
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="First Name"
                                                    aria-label="First Name"
                                                    onChange={(e) => change('first_name',e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Family Name"
                                                    aria-label="Family Name"
                                                    onChange={(e) => change('last_name',e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    aria-label="Email"
                                                    onChange={(e) => change('email',e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    aria-label="Password"
                                                    onChange={(e) => change('password',e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Confirm Password"
                                                    aria-label="Confirm Password"
                                                    onChange={(e) => change('confirmPassword',e.target.value)}
                                                />
                                            </div>

                                            <div className="text-center">
                                                <button
                                                    type="button"
                                                    className="btn bg-gradient-dark w-100 my-4 mb-2"
                                                    onClick={() => addUser()}
                                                >
                                                    Sign up
                                                </button>
                                            </div>
                                            <p className="text-sm mt-3 mb-0">
                                                Already have an account?{" "}
                                                <Link
                                                    to="/login"
                                                    className="text-dark font-weight-bolder"
                                                >
                                                    Sign in
                                                </Link>
                                            </p>
                                        </form>
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

export default Register;