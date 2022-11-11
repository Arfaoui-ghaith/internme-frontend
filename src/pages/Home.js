import React, {useState,useEffect} from 'react';
import Card from './components/Card'
import AuthNav from "./User/AuthNav";
import axios from 'axios'
import Select from 'react-select'
import uab from 'unique-array-objects';
import makeAnimated from 'react-select/animated';
import { useAuthState } from './../context/auth'

function Home() {

    const {user} = useAuthState();
    const [interns,setInterns] = useState([]);
    let [skills,setSkills] = useState([]);
    let [userData, setUserData] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:9000/api/users/me",{headers: {'Authorization': `${user}`}})
            .then(res => setUserData(res.data.user))
            .catch(err => console.error(err.message));
    },[user])



    useEffect(() => {
        axios.get("http://localhost:9000/api/interns/")
            .then(res => {
                let skills1 = [];
                for(let item of res.data.interns.filter(item => item.skills.length > 0)){
                    for(let sk of item.skills){
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

    let [data, setData] = useState({country: [], company: [], skill: [], remote: false, match: false})


    const filter = (index,value) => {
        if(value === ""){
            let obj = data;
            delete obj[index];
            setData(obj);
        }else {
            let obj = {...data};
            obj[index] = value;
            setData(obj);
        }
    }


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
                                <h6 className="mb-1">Filter {interns.length} Internships from {companies.length} Companies and 5 Countries</h6>
                                <div className="d-flex justify-content-around">
                                    <div className="form-check form-switch mt-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckChecked"
                                            defaultChecked=""
                                            onClick={() => setData({...data,remote: !data.remote})}
                                        />
                                        <label className="form-check-label">
                                            Remote
                                        </label>
                                    </div>
                                    { user ?
                                        <div className="form-check form-switch mt-2">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="flexSwitchCheckChecked"
                                                defaultChecked=""
                                                onClick={() => setData({...data, match: !data.match})}
                                            />
                                            <label className="form-check-label">
                                                Match my skills
                                            </label>
                                        </div>
                                        :
                                        <div></div>
                                    }
                                    <Select
                                        placeholder={"Countries"}
                                        components={animatedComponents}
                                        className={"mb-3 w-20"}
                                        isMulti
                                        onChange={(list) => filter("country",list.map(c => c.value))}
                                        options={countries} />

                                    <Select placeholder={"Companies"}
                                            components={animatedComponents}
                                            className={"mb-3 w-20"}
                                            isMulti
                                            onChange={(list) => filter("company",list.map(c => c.value))}
                                            options={companies} />
                                    <Select placeholder={"Skills"}
                                            components={animatedComponents}
                                            className={"mb-3 w-20"}
                                            isMulti
                                            onChange={(list) => filter("skill",list.map(c => c.value))}
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
                                        <Card intern={intern} key={intern.id} data={data} userData={userData}/>
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