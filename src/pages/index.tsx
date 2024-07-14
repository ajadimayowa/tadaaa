import { useState } from "react";
import SignupModal from "../components/modals/signupmodal";
import { Button, Card } from "react-bootstrap";
import TopBarUnAuth from "../components/bars/topbar";
import team from '../assets/svgs/team.svg';
import './index.css'
import SideBarUnAuth from "../components/bars/sidebar";
const HomePage = () => {
    const [regModal, setRegModal] = useState(false);
    const [onSideNav, setOnSideNav] = useState(false);
    const [currentService, setCurrentService] = useState(0)
    const services = [
        [
            {
                title: 'Article Writing',
                icon: "bi bi-journal-bookmark"
            },
            {
                title: 'Graphics Design',
                icon: "bi bi-palette"
            },
            {
                title: 'Presentation Design',
                icon: "bi bi-easel2"
            },

            {
                title: 'Graphics Design',
                icon: "bi bi-palette"
            },
            {
                title: 'Programing & Tech',
                icon: "bi bi-laptop"
            },
        ],
        [
            {
                title: 'Article Writing',
                icon: "bi bi-journal-bookmark"
            },
            {
                title: 'Graphics Design',
                icon: "bi bi-palette"
            },
            {
                title: 'Presentation Design',
                icon: "bi bi-easel2"
            },

            {
                title: 'Programing & Tech',
                icon: "bi bi-laptop"
            },
            {
                title: 'Health Diagnosis',
                icon: "bi bi-easel2"
            },
        ],
        [
            {
                title: 'Marketing Video',
                icon: "bi bi-camera-video"
            },
            {
                title: 'Website Development',
                icon: "bi bi-globe"
            },
            {
                title: 'Graphics Design',
                icon: "bi bi-palette"
            },
            {
                title: 'Programing & Tech',
                icon: "bi bi-laptop"
            },
        ],
        [
            {
                title: 'Virtual Assistant',
                icon: "bi bi-camera-video"
            },
            {
                title: 'Graphics Design',
                icon: "bi bi-palette"
            },
            {
                title: 'Fashion & Tailoring',
                icon: "bi bi-easel2"
            },
            {
                title: 'Health Diagnosis',
                icon: "bi bi-easel2"
            },
        ]
    ]

const handleNextService = (currentServ:number)=>{
    if(currentServ == services.length -1) {
        setCurrentService(0)
    } else {
        setCurrentService(curr => curr +1)
    }

}

const handlePrevService = (currentServ:number)=>{
    if(currentServ == 0) {
        setCurrentService(services.length -1)
    } else {
        setCurrentService(curr => curr -1)
    }

}
    return (
        <div className="container-fluid p-0 m-0 w-100" style={{ zIndex: 5 }}>
            <SideBarUnAuth onSignIn={() => { setRegModal(true); setOnSideNav(!onSideNav) }} toggleSideBar={() => setOnSideNav(!onSideNav)} onSideBar={onSideNav} />
            <TopBarUnAuth buttonClicked={() => setRegModal(true)} togSide={() => setOnSideNav(!onSideNav)} />
            <div className="w-100 section-one bg-primary text-light px-4">

                <div className="left d-flex flex-column mt-4 gap-2">
                    <h5 className="fw-bolder fs-1">
                        Empowering Nigerians with
                        <br />
                        Remote Work Opportunities
                        <br />
                        and Connections.
                    </h5>
                    <p>
                        Work9ja connects Nigerian professionals
                        with remote
                        work opportunities, <br /> providing a seamless platform
                        for job seekers and  employers <br /> to   collaborate
                        and thrive in a flexible work environment.
                    </p>
                    <Button
                        onClick={() => setRegModal(true)}
                        className="bg-secondary rounded rounded-4 text-light"
                        style={{ minWidth: '10em', minHeight: '3.5em', maxWidth: '10em' }}
                    >Get Started</Button>
                </div>
                <div className="right d-flex mt-4">
                    <img className="" src={team} />
                </div>

            </div>

            <div className="w-100 mt-3 section-two">

                <h4 className="text-center">Available Services</h4>
                <div className="w-100 d-flex gap-3 justify-content-center align-items-center mt-4">
                    <i className="bi bi-chevron-left" role="button" onClick={()=>handlePrevService(currentService)}></i>
                    <div className="d-flex gap-3 justify-content-center" style={{flexWrap:'wrap'}}>
                    {
                        services.map((service) => 
                        <Card  className="p-3 border border-0 shadow  gap-3" style={{ minHeight: '9em', maxHeight: '9em', minWidth:'9em', maxWidth:'9em', transition:'all' }}>
                            <i className={service[currentService].icon}></i>
                            <h5>{service[currentService].title}</h5>
                        </Card>)
                    }
                    </div>
                    <i className="bi bi-chevron-right" role="button" onClick={()=>handleNextService(currentService)}></i>
                </div>
            </div>
            <div className="text-center py-3 mt-3" style={{ backgroundColor: '#E9F4F2' }}>Powered by Floath Solution Hub</div>

            <SignupModal on={regModal} off={() => setRegModal(false)} />
        </div>
    )
}
export default HomePage;