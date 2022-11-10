import React, {useEffect, useState} from 'react';
import AuthNav from "./User/AuthNav";
import { useAuthState } from './../context/auth'
import UserForm from "./components/UserForm";
import ImageUpdater from "./components/ImageUpdater"
import axios from 'axios';

function Profile(){
    const [show, setShow] = useState(false);
    const [showImage, setShowImage] = useState(false);
    let [data, setData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseImage = () => setShowImage(false);
    const handleShowImage = () => setShowImage(true);

    const {user} = useAuthState();

    useEffect(() => {
        axios
            .get("http://localhost:9000/api/users/me",{headers: {'Authorization': `${user}`}})
            .then(res => setData(res.data.user))
            .catch(err => console.error(err.message));
    },[])

    return(
        <>
            <UserForm show={show} handleClose={handleClose} data={data}/>
            <ImageUpdater showImage={showImage} handleCloseImage={handleCloseImage}/>
            <div className="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
                {/* Navbar */}
                <AuthNav />
                {/* End Navbar */}
                <div className="container-fluid">
                    <div
                        className="page-header min-height-300 border-radius-xl mt-4"
                        style={{
                            backgroundImage: `url("../assets/img/curved-images/curved${Math.floor(Math.random() * 23)}.jpg")`,
                            backgroundPositionY: "50%"
                        }}
                    >
                        <span className="mask bg-gradient-primary opacity-6"/>
                    </div>
                    <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
                        <div className="row gx-4">
                            <div className="col-auto">
                                <div className="avatar avatar-xl position-relative">
                                    <img
                                        src={data.image}
                                        alt="profile_image"
                                        className="w-100 border-radius-lg shadow-sm"
                                        onClick={handleShowImage}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="container-fluid py-4">
                    <div className="row">
                        <div className="col-12 col-xl-4">
                            <div className="card h-100">
                                <div className="card-header pb-0 p-3">
                                    <h6 className="mb-0">Platform Settings</h6>
                                </div>
                                <div className="card-body p-3">
                                    <h6 className="text-uppercase text-body text-xs font-weight-bolder">
                                        Account
                                    </h6>
                                    <ul className="list-group">
                                        <li className="list-group-item border-0 px-0">
                                            <div className="form-check form-switch ps-0">
                                                <input
                                                    className="form-check-input ms-auto"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault"
                                                    defaultChecked=""
                                                />
                                                <label
                                                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                                                    htmlFor="flexSwitchCheckDefault"
                                                >
                                                    Email me when someone follows me
                                                </label>
                                            </div>
                                        </li>
                                        <li className="list-group-item border-0 px-0">
                                            <div className="form-check form-switch ps-0">
                                                <input
                                                    className="form-check-input ms-auto"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault1"
                                                />
                                                <label
                                                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                                                    htmlFor="flexSwitchCheckDefault1"
                                                >
                                                    Email me when someone answers on my post
                                                </label>
                                            </div>
                                        </li>
                                        <li className="list-group-item border-0 px-0">
                                            <div className="form-check form-switch ps-0">
                                                <input
                                                    className="form-check-input ms-auto"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault2"
                                                    defaultChecked=""
                                                />
                                                <label
                                                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                                                    htmlFor="flexSwitchCheckDefault2"
                                                >
                                                    Email me when someone mentions me
                                                </label>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="card h-100">
                                <div className="card-header pb-0 p-3">
                                    <div className="row">
                                        <div className="col-md-8 d-flex align-items-center">
                                            <h6 className="mb-0">Profile Information</h6>
                                        </div>
                                        <div className="col-md-4 text-end pointer-cursor">
                                                <i
                                                    className="fas fa-user-edit text-secondary text-sm "
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    aria-hidden="true"
                                                    aria-label="Edit Profile"
                                                    onClick={handleShow}
                                                />
                                                <span className="sr-only">Edit Profile</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    <ul className="list-group">
                                        <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                            <strong className="text-dark">Full Name:</strong> &nbsp; Alec M.
                                            Thompson
                                        </li>
                                        <li className="list-group-item border-0 ps-0 text-sm">
                                            <strong className="text-dark">Mobile:</strong> &nbsp; (44) 123 1234
                                            123
                                        </li>
                                        <li className="list-group-item border-0 ps-0 text-sm">
                                            <strong className="text-dark">Email:</strong> &nbsp;
                                            alecthompson@mail.com
                                        </li>
                                        <li className="list-group-item border-0 ps-0 text-sm">
                                            <strong className="text-dark">Location:</strong> &nbsp; USA
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="card h-100">
                                <div className="card-header pb-0 p-3">
                                    <div className="row">
                                        <div className="col-md-8 d-flex align-items-center">
                                            <h6 className="mb-0">My Skills</h6>
                                        </div>
                                        <div className="col-md-4 text-end pointer-cursor">

                                            <i
                                                className="fas fa-list text-secondary text-sm "
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                aria-hidden="true"
                                                aria-label="Edit Profile"
                                            />
                                            <span className="sr-only">Edit Skills</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-3"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Profile;