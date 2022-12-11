import React, {useCallback} from 'react';
import {
    useNavigate
} from "react-router-dom";

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuthDispatch } from './../context/auth'
import { useAuthState } from './../context/auth'

const image = Math.floor(Math.random() * 23);

function Verify() {

    const {email} = useAuthState();
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();
    const [data, setData] = React.useState({email});

    const handleOnClick = useCallback(() => navigate("/reset", {replace: true}), [navigate]);

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

    const verify = () => {
        toast.promise(
            axios
                .post('http://localhost:9000/api/users/verify', data)
                .then(res => {
                    dispatch({ type:'Save_Token', payload: res.data.token });
                    handleOnClick();
                }),
            {
                loading: 'Loading...',
                success: `Success`,
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
                                                Code Verification
                                            </h3>
                                            <p className="mb-0">Enter your the code that we sent it to you via your email .</p>
                                        </div>
                                        <div className="card-body">
                                            <form >
                                                <label>Code</label>
                                                <div>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Code"
                                                        aria-label="Code"
                                                        onChange={(e) => change('code',e.target.value)}
                                                    />
                                                </div>

                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn bg-gradient-info w-100 mt-4 mb-0"
                                                        onClick={() => verify()}
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

export default Verify;