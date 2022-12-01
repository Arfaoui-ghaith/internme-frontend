import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import {useAuthState} from "../../context/auth";
import Select from "react-select";
import makeAnimated from 'react-select/animated';


function SkillsUpdater({showSkills,handleCloseSkills, data, setData}){

    const  animatedComponents = makeAnimated();

    const {user} = useAuthState();

    const convertUserSkills = () => {
        if(data.skills !== undefined) {
            return data.skills.map(item => { return { label: item.skill.title, value: item.skill.id } })
        }
        return [];
    }

    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState(convertUserSkills());

    const convert = (skills) => {
        return skills.map(item => { return { label: item.title, value: item.id } });
    }

    useEffect(() => {
        axios({
            method: 'get',
            url:'https://internme.onrender.com/api/skills/',
            headers:{
                'Authorization': `${user}`
            }
        }).then(res => setSkills(res.data.skills))
    },[])

    const updateUser = () => {
        toast.promise(
            axios({
                method: 'put',
                url:'https://internme.onrender.com/api/users/me',
                data: {...data, skills: selectedSkills.map(item => item.value)},
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
            <Modal show={showSkills} onHide={handleCloseSkills}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile Skills</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="mb-3">
                            <Select placeholder={"Skills"}
                                    components={animatedComponents}
                                    defaultValue={convertUserSkills()}
                                    className={"mb-3 w-100"}
                                    isMulti
                                    aria-label={"My skills"}
                                    onChange={(list) => setSelectedSkills(list)}
                                    options={convert(skills)}
                                     />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSkills}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { updateUser(); handleCloseSkills(); }}>
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

export default SkillsUpdater;