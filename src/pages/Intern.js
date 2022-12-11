import React, {useCallback, useState} from 'react';
import AuthNav from "./User/AuthNav";
import {useInternState} from "../context/intern";
import { format } from 'timeago.js';
import axios from "axios";
import { useAuthState } from './../context/auth'
import {useNavigate} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

const image = Math.floor(Math.random() * 23);
function Intern(){
    const {user} = useAuthState();
    const { intern } = useInternState();
    const duration = format(new Date(intern.validThrough).getTime(),"my-locale",{relativeDate: new Date(/*intern.datePosted*/).toLocaleDateString()});
    const navigate = useNavigate();
    const extractPDF = () => {
            axios({
                method: 'post',
                url:'http://localhost:9000/api/interns/extract',
                data: {
                    title: intern.title,
                    company: {
                        name: intern.company.name,
                        address: intern.company.address+", "+intern.company.country
                    }
                },
                headers:{
                    'Authorization': `${user}`
                }
            })
            .then(res => {
                console.log(res)
                window.open(res.data.pdf.download_url, "_blank")
                //navigate(res.data.pdf.download_url, {replace: true})
            })
            .catch(err => console.error(err.message));
    }
    return(
        <>
            <div className="main-content position-relative bg-gray-100 max-height-vh-100 h-100">
                <ScrollToTop smooth color="#6f00ff" />
                {/* Navbar */}
                <AuthNav />
                {/* End Navbar */}
                <div className="container-fluid">
                    <div
                        className="page-header min-height-300 border-radius-xl mt-4"
                        style={{
                            backgroundImage: `url("../assets/img/curved-images/curved${image}.jpg")`,
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
                                        src={intern.company.image}
                                        alt="profile_image"
                                        className="w-100 border-radius-lg shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="col-auto my-auto">
                                <div className="h-100">
                                    <h5 className="mb-1">{intern.title}</h5>
                                    <p className="mb-0 font-weight-bold text-sm">{intern.company.name} ({format(new Date(intern.datePosted).getTime())})</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                                <div className="nav-wrapper position-relative end-0">
                                    <ul
                                        className="nav nav-pills nav-fill p-1 bg-transparent"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            {intern.company.country} {intern.company.countryFlag}
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            {intern.company.address}
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            {intern.remote ?
                                                <p className="badge bg-success fw-bold text-light">Remote</p>
                                                : <p className="badge bg-danger fw-bold text-light">On site</p>
                                            }
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-4">
                    <div className="row">
                        <div className="col-12 col-xl-8">
                            <div className="card h-100">
                                <div className="card-header pb-0 p-3">
                                    <div className="row">
                                        <div className="col-md-8 d-flex align-items-center">
                                            <h6 className="mb-0">Internship details </h6>
                                        </div>

                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: intern.description.trim() }}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="card h-10 mb-3">
                                <div className="card-body p-3">
                                    <ul className="list-group">
                                        {new Date().getTime() < new Date(intern.validThrough).getTime() ?
                                        <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                            <div className="d-flex align-items-start flex-column justify-content-center">
                                                <h4 className="mb-0 text-sm">{`You can apply ${duration}`}</h4>
                                                <p className="mb-0 text-xs">Available untill, {new Date(intern.validThrough).toUTCString()}</p>
                                            </div>
                                            <a className="btn btn-link pe-3 ps-0 mb-0 ms-auto"
                                               href={intern.url}
                                               target="_blank"
                                               rel="noreferrer"
                                            >
                                                Apply Now
                                            </a>
                                            <span className="btn btn-link pe-3 ps-0 mb-0 ms-auto"
                                                onClick={()=>extractPDF()}
                                            >
                                                Extract Application
                                            </span>
                                        </li> :
                                            <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                                <div className="d-flex align-items-start flex-column justify-content-center">
                                                    <h4 className="mb-0 text-sm">{`Expired ${duration}`}</h4>
                                                    <p className="mb-0 text-xs">Closed on, {new Date(intern.validThrough).toUTCString()}</p>
                                                </div>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>

                            <div className="card h-10 mb-3">
                                <div className="card-header pb-0 p-3">
                                    <h6 className="mb-0">Skills Needed</h6>
                                </div>
                                <div className="card-body p-3">
                                    {
                                        intern.skills.map(item => {
                                            return (
                                                <span className="badge bg-primary px-2 m-1">{item.skill.title}</span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Intern;