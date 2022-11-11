//eslint-disable-next-line
import React, {useCallback, useState} from 'react';
import './Styles/card.css';
import { Image } from '@chakra-ui/react'
import { useInternDispatch } from './../../context/intern'
import { useAuthState } from './../../context/auth'
import {useNavigate} from "react-router-dom";
import {format} from "timeago.js";
import ProgressBar from "./ProgressBar";

function Card({intern, data, userData}) {
    const dispatch = useInternDispatch();
    const { user } = useAuthState();
    const navigate = useNavigate();
    let [path, setPath] = useState("/intern");
    const [prog, setProg] = useState(0);

    const handleOnClick = useCallback(() => navigate(path, {replace: true}), [navigate,path]);

    const redirect = () => {
        if(!user){
            setPath("/login");
            handleOnClick();
        }else{
            dispatch({ type:'SAVE', payload: intern });
            handleOnClick();
        }
    }

    const show = () => {
        let c = true;
        if(data.country.length > 0){
            c = c && data.country.includes(intern.company.country)
        }
        if(data.company.length > 0){
            c = c && data.company.includes(intern.company.name)
        }
        if(data.skill.length > 0){
            c = c && data.skill.filter(x => intern.skills.map(sk => sk.skill.title).includes(x)).length > 0
        }
        if(data.remote){
            c = c && intern.remote === true
        }
        if(data.match){
            c = c && prog > 0
        }
        return c
    }

    if(show()) {
        return (
            <React.Fragment>
                <div className="col-md-4">
                    <div className="card p-3 mb-2">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div className="icon mb-2">
                                    <Image
                                        className="rounded"
                                        borderRadius='full'
                                        objectFit='cover'
                                        boxSize='55px'
                                        src={intern.company.image}
                                        alt={intern.company.name}
                                    />
                                </div>
                                <div className="ms-2 c-details">
                                    <h6 className="mb-0">{intern.company.name}</h6> <p>{intern.company.countryFlag}</p>
                                </div>
                            </div>
                            <div className="badge">
                                {intern.remote ?
                                    <p className="badge bg-success fw-bold text-light">Remote</p>
                                    : <p className="badge bg-danger fw-bold text-light">On site</p>
                                }
                            </div>
                        </div>
                        <div className="mt-1">
                            <h6 className="heading" style={{cursor: 'pointer'}} onClick={() => redirect()}>
                                {intern.title}
                            </h6>
                            <div className="mt-5">
                                {
                                    user ?
                                        <ProgressBar key={intern.id} userdata={userData} intern={intern} setProg={setProg}/>

                                        :
                                        <div>
                                            {
                                                intern.skills.map(item => item.skill.title).sort()
                                                    .slice(0, 3).map(skill => {
                                                    return (
                                                        <span className="badge bg-primary px-2 m-1">{skill}</span>
                                                    )
                                                })
                                            }
                                            <span className="badge bg-primary px-2 m-1">+more</span>
                                        </div>


                                }

                                <div className="mt-3">
                                    {" "}
                                    <span className="text1">
                                            <span
                                                className="text2">Posted</span> {format(new Date(intern.datePosted).getTime())}
                                        </span>{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Card;