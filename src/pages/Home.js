import React, {useState,useEffect} from 'react';
import Card from './components/Card'
import AuthNav from "./User/AuthNav";
import axios from 'axios'
import Select from 'react-select'
import uab from 'unique-array-objects';
import makeAnimated from 'react-select/animated';

function Home() {

    const [interns,setInterns] = useState([]);
    let [skills,setSkills] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/api/interns/")
            .then(res => {
                let skills1 = [];
                for(let item of res.data.interns.filter(item => item.skills.length > 0)){
                    for(let sk of item.skills){
                        console.log(sk)
                        skills1.push({ value: `${sk.skill.title}`, label: `${sk.skill.title}` });
                    }
                }
                setSkills(uab(skills1))

                return setInterns(res.data.interns.filter(item => item.skills.length > 0))
            })
            .catch(er => console.error(er));


    },[]);

    const countries = uab(interns.map(item => {
        return { value: item.company.country, label: `${item.company.countryFlag} | ${item.company.country}` }
    }));

    const companies = uab(interns.map(item => {
        return { value: item.company.name, label: `${item.company.name}` }
    }));






    const animatedComponents = makeAnimated();
    return (
        <React.Fragment>
            <>
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    {/* Navbar */}
                    <AuthNav />
                    {/* End Navbar */}
                    <div className="col-12 mt-4">
                        <div className="card mb-4">
                            <div className="card-header pb-0 p-3">
                                <h6 className="mb-1">Filter</h6>
                                <div className="d-flex justify-content-around">
                                    <Select
                                        placeholder={"Countries"}
                                        components={animatedComponents}
                                        className={"mb-2 w-20"}
                                        isMulti
                                        options={countries} />
                                    <Select placeholder={"Companies"}
                                            components={animatedComponents}
                                            className={"mb-2 w-20"}
                                            isMulti
                                            options={companies} />
                                    <Select placeholder={"Skills"}
                                            components={animatedComponents}
                                            className={"mb-2 w-20"}
                                            isMulti
                                            options={skills} />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid py-4">
                        <div className="row">
                            {
                                interns.map(intern => {
                                    return (
                                        <Card intern={intern} key={intern.id}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </main>
            </>

        </React.Fragment>
    )
}

export default Home;