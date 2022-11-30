import React, {useState,useEffect} from 'react';
import Card from './components/Card1'
import AuthNav from "./components/AuthNav";
import  Footer from './components/Footer';
import axios from 'axios'

function GuestHome() {

    const [interns,setInterns] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/api/interns/")
            .then(res => setInterns(res.data.interns))
            .catch(er => console.error(er));
    },[]);

    return (
        <React.Fragment>
            <>
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    {/* Navbar */}
                    <AuthNav />
                    {/* End Navbar */}
                    <div className="container-fluid py-4">
                        <div className="row">
                            {
                                interns.map(intern => {
                                    return (
                                        <Card intern={intern}/>
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

export default GuestHome;