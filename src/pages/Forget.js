import React, {useCallback} from 'react';
import {
    useNavigate
} from "react-router-dom";

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuthDispatch } from './../context/auth'

const image = Math.floor(Math.random() * 23);

function ForgetPassword() {

    const dispatch = useAuthDispatch();
    const navigate = useNavigate();
    const [data, setData] = React.useState({});

    const handleOnClick = useCallback(() => navigate("/verify", {replace: true}), [navigate]);

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

    const forgetPassword = () => {
        toast.promise(
            axios
                .post('https://internme.onrender.com/api/users/reset', data)
                .then(res => {
                    dispatch({ type:'Save_Email', payload: data.email });
                    window.location.replace('/verify');
                }),
            {
                loading: 'Loading...',
                success: `Check your email`,
                error: (err) => err.response.data.message,
            }
        );
    }

    return (
        <React.Fragment>
            <main className="main-content  mt-0">
                <section>
                    <div className="page-header min-vh-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                    <div className="card card-plain mt-1">
                                        <div className="card-header pb-0 text-left bg-transparent">
                                            <h3 className="font-weight-bolder text-info text-gradient">
                                                Forget Your Password ?
                                            </h3>
                                            <p className="mb-0">Enter your email and we will help you.</p>
                                        </div>
                                        <div className="card-body">
                                            <form >
                                                <label>Email</label>
                                                <div>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                        aria-label="Email"
                                                        aria-describedby="email-addon"
                                                        onChange={(e) => change('email',e.target.value)}
                                                    />
                                                </div>

                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn bg-gradient-info w-100 mt-4 mb-0"
                                                        onClick={() => forgetPassword()}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                        <div
                                            className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                                            style={{
                                                backgroundImage: `url("../assets/img/curved-images/curved${image}.jpg")`
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

export default ForgetPassword;