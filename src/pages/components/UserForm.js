import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";

function UserForm({show,handleClose, data, setData}){

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

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserForm;