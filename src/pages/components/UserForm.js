import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import {useAuthState} from "../../context/auth";


function UserForm({show,handleClose, data, setData}){

    const {user} = useAuthState();

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

    const updateUser = () => {
        toast.promise(
            axios({
                method: 'put',
                url:'https://internme-backend.herokuapp.com/api/users/me',
                data: {...data, skills: data.skills.map(item => item.skill.id)},
                headers:{
                    'Authorization': `${user}`
                }
            })
                .then(res => setData(res.data.user)),
            {
                loading: 'Loading...',
                success: 'Success',
                error: (err) => err.response.data.message,
            }
        )
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile Informations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                aria-label="First Name"
                                defaultValue={data.first_name}
                                onChange={(e) => change('first_name',e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Family Name"
                                aria-label="Family Name"
                                defaultValue={data.last_name}
                                onChange={(e) => change('last_name',e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                aria-label="Email"
                                defaultValue={data.email}
                                onChange={(e) => change('email',e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                aria-label="Password"
                                defaultValue={""}
                                onChange={(e) => change('password',e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                aria-label="Confirm Password"
                                defaultValue={""}
                                onChange={(e) => change('confirmPassword',e.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { updateUser(); handleClose(); }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Toaster
                position="top-center"
            />
        </>
    )
}

export default UserForm;