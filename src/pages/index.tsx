import { useEffect, useState } from "react";
import SignupModal from "../components/modals/signupmodal";
import { Button, Card, FormControl } from "react-bootstrap";
import TopBarUnAuth from "../components/bars/topbar";
import team from '../assets/svgs/team.svg';
import './index.css'
import SideBarUnAuth from "../components/bars/sidebar";
import LoginModal from "../components/modals/loginmodal";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate()
    const token: string = localStorage.getItem('userToken') || ''
    const [regModal, setRegModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [onSideNav, setOnSideNav] = useState(false);
    const [currentService, setCurrentService] = useState(0);
    const currentServicePopular = 0;

    const LoadingPage = ()=>{

        useEffect(() => {
            token && navigate('/home', { replace: true, preventScrollReset: true })
        }, [token])

        return (
            <div>loading</div>
        )
    }

   
    const services = [
        {
            category: 'all-service',
            gigs: [
                { title: 'Fashion & Tailoring', icon: 'bi bi-scissors', serviceId: '1' },
                { title: 'Software Development', icon: 'bi bi-pc-display-horizontal', serviceId: '2' },
                { title: 'Marketing Skits', icon: 'bi bi-camera-reels', serviceId: '3' },

                { title: 'Media Services & Jinggles', icon: 'bi bi-camera-reels', serviceId: '10' },
                { title: 'Consultation Services', icon: 'bi bi-pc-display-horizontal', serviceId: '11' },
                { title: 'Marketing Skits', icon: 'bi bi-camera-reels', serviceId: '12' },

            ]
        },
        {
            category: 'trending-services',
            gigs: [
                { title: 'Graphics Design', icon: 'bi bi-palette', serviceId: '4' },
                { title: 'Delivery Service', icon: 'bi bi-bicycle', serviceId: '5' },
                { title: 'Article Writting & Content', icon: 'bi bi-pen', serviceId: '6' },

                { title: 'Real Estate Services', icon: 'bi bi-house', serviceId: '7' },
                { title: 'Presentation Design', icon: 'bi bi-easel', serviceId: '8' },
                { title: 'Virtual Assitance', icon: 'bi bi-laptop', serviceId: '9' },

            ]
        },
        {
            category: 'other-services',
            gigs: [
                { title: 'Real Estate Services', icon: 'bi bi-house', serviceId: '7' },
                { title: 'Presentation Design', icon: 'bi bi-easel', serviceId: '8' },
                { title: 'Virtual Assitance', icon: 'bi bi-laptop', serviceId: '9' },

                { title: 'Media Services & Jinggles', icon: 'bi bi-camera-reels', serviceId: '10' },
                { title: 'Consultation Services', icon: 'bi bi-pc-display-horizontal', serviceId: '11' },
                { title: 'Marketing Skits', icon: 'bi bi-camera-reels', serviceId: '12' },

            ]
        }
    ]

    const ourValues = [
        {
            title: 'Well veted proffesionals',
            icon: 'bi bi-award-fill',
            description:
                'Get access to a pool of skilled industry professionals from all over Nigeria. for every task, at any price point.'
        },
        {
            title: 'Pay per project delivery',
            icon: 'bi bi-currency-exchange',
            description:
                'No monthly salary, just project-based pricing. Payments only get released when you approve.'
        },
        {
            title: 'No delay in delivery',
            icon: 'bi bi-stopwatch-fill',
            description:
                'Filter to find the right professionals quickly and get great work delivered in no time, every time.'
        },
        {
            title: '24/7 Customer support',
            icon: 'bi bi-headset',
            description:
                'Chat with our team to get your questions answered or resolve any issues with your orders.'
        }

    ]

    const porpularServices = [
        {
            category: 'all-service',
            gigs: [
                { title: 'Fashion & Tailoring', icon: 'bi bi-scissors', serviceId: '1', color: '#071952' },
                { title: 'Software Development', icon: 'bi bi-pc-display-horizontal', serviceId: '2', color: '#FFB200' },
                { title: 'Graphics Design', icon: 'bi bi-palette', serviceId: '4', color: '#1679AB' },
                { title: 'Delivery Service', icon: 'bi bi-bicycle', serviceId: '5', color: '#3FA2F6' },
                { title: 'Fashion & Tailoring', icon: 'bi bi-scissors', serviceId: '1', color: '#EB5B00' },
                { title: 'Software Development', icon: 'bi bi-pc-display-horizontal', serviceId: '2', color: '#E4003A' },
                { title: 'Graphics Design', icon: 'bi bi-palette', serviceId: '4', color: '#B60071' },

            ]
        },
    ]

    const handleNextService = (currentServ: number) => {
        if (currentServ == services.length - 1) {
            setCurrentService(0)
        } else {
            setCurrentService(curr => curr + 1)
        }

    }

    const handlePrevService = (currentServ: number) => {
        if (currentServ == 0) {
            setCurrentService(services.length - 1)
        } else {
            setCurrentService(curr => curr - 1)
        }

    }



    return (
        <div className="container-fluid p-0 m-0 w-100" style={{ zIndex: 5 }}>
            {
                token? <LoadingPage/> :
                <>
                <SideBarUnAuth onSignIn={() => { setRegModal(true); setOnSideNav(!onSideNav) }} toggleSideBar={() => setOnSideNav(!onSideNav)} onSideBar={onSideNav} />
            <TopBarUnAuth buttonClicked={() => setLoginModal(true)} togSide={() => setOnSideNav(!onSideNav)} />
            <div className="w-100 section-one bg-primary text-light px-4">

                <div className="left d-flex flex-column mt-4 gap-2">
                    <h5 className="fw-bolder fs-1">
                        Empowering Nigerians with
                        Remote Work Opportunities
                        and Connections.
                    </h5>
                    <p>
                        Work9ja connects Nigerian professionals
                        with remote
                        work opportunities, providing a seamless platform
                        for job seekers and  employers to   collaborate
                        and thrive in a flexible work environment.
                    </p>
                    <form className="d-flex justify-content-end align-items-center" style={{ position: 'relative' }}>
                        <FormControl
                            style={{ minHeight: '3.5em' }}
                            placeholder="Search for any service..."
                            className="rounded fw-medium rounded-3 px-3 p-2 outline form-control-outline w-100 border border-1 border-grey"
                            id='email' name='email' />
                        <a className="text-light" href="#section-three" style={{ marginRight: '15px', position: 'absolute' }}>
                            <i className="bi bi-search p-2 px-3 rounded bg-secondary text-end"
                            ></i>
                        </a>
                    </form>
                </div>
                <div className="right d-flex mt-4 justify-content-center">
                    <img className="" src={team} />
                </div>

            </div>

            <div className="w-100 mt-3 section-two">

                <h3 className="text-center">Available Services</h3>
                <div className="w-100 d-flex gap-2 px-2 justify-content-center align-items-center mt-4">
                    <i className="bi bi-chevron-left" role="button" onClick={() => handlePrevService(currentService)}></i>
                    <div className="d-flex gap-3  justify-content-center align-items-center"
                        style={{ flexWrap: 'wrap', transition: 'all 1s ease-in' }}>
                        {
                            services[currentService].gigs.map((serv: any) => (
                                <div className="d-flex flex-column align-items-center gap-2"
                                    style={{ maxWidth: '7em', maxHeight: '10em', }}>
                                    <Card className="shadow-lg border-0"
                                        style={{ minWidth: '7em', minHeight: '7em' }}>
                                        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                                            <i className={` ${serv.icon}`} style={{ fontSize: '2em' }}></i>
                                        </Card.Body>
                                    </Card>
                                    <p className="niramit-semibold text-center"
                                        style={{ textWrap: 'wrap', wordWrap: 'break-word' }}>{serv.title}</p>
                                </div>

                            ))
                        }
                    </div>
                    <i className="bi bi-chevron-right" role="button" onClick={() => handleNextService(currentService)}></i>
                </div>
            </div>

            <div className="d-flex text-center p-3">

                <hr className="px-3 w-100" />
            </div>
            <div className="w-100 mt-3 section-three" id="section-three">

                <h3 className="text-center">Most Wanted Services</h3>
                <div className="w-100 d-flex gap-2 px-2 justify-content-center align-items-center mt-4">
                    {/* <i className="bi bi-chevron-left" role="button" onClick={() => handlePrevServicePop(currentServicePopular)}></i> */}
                    <div className="d-flex gap-3 w-100  align-items-center"
                        id="services"
                        style={{ transition: 'all 1s ease-in', overflowX: 'scroll', maxWidth: '100%' }}>
                        {
                            porpularServices[currentServicePopular].gigs.map((serv: any) => (
                                <div className="d-flex flex-column align-items-center gap-2"
                                    style={{ minWidth: '10em', maxHeight: '15em', minHeight: '15em' }}>
                                    <Card className="shadow-sm border-0"
                                        style={{ minWidth: '10em', minHeight: '14em', backgroundColor: serv.color }}>
                                        <Card.Body className="d-flex text-light flex-column align-items-center justify-content-center">
                                            <i className={` ${serv.icon}`} style={{ fontSize: '2em' }}></i>

                                            <p className="niramit-semibold text-center"
                                                style={{ textWrap: 'wrap', wordWrap: 'break-word' }}>{serv.title}</p>
                                        </Card.Body>
                                    </Card>

                                </div>

                            ))
                        }
                    </div>

                </div>
            </div>

            <div className="w-100 mt-4 section-4">

                <h3 className="px-2 w-75">
                    Connecting you to a whole new approach to service delivery.
                </h3>

            </div>

            <div className="w-100 mt-5 section-5">
                {
                    ourValues.map((values) =>
                        <div className="px-2 gap-3 d-flex flex-column">
                            <div className="d-flex gap-2 align-items-center">
                                <i className={`bi ${values.icon}`} style={{ fontSize: '1.7em' }}></i>
                                <h5>{values.title}</h5>
                            </div>

                            <p className="px-3">
                                {values.description}
                            </p>

                        </div>
                    )
                }

            </div>

            <div className="d-flex justify-content-center w-100 mt-5 section-6">
                <Card className="shadow-sm border-0"
                    style={{ minWidth: '20em', minHeight: '17em', backgroundColor: '#8D493A' }}>
                    <Card.Body className="d-flex text-light flex-column align-items-center justify-content-center">
                        <i className="" style={{ fontSize: '2em' }}></i>
                        <h3 className="niramit-semibold text-center"
                            style={{ textWrap: 'wrap', wordWrap: 'break-word' }}>
                            Quality service at the comfort of Home
                        </h3>
                        <Button
                            onClick={() => setRegModal(true)}
                            className="bg-secondary rounded border-0 rounded-4 text-light"
                            style={{ minWidth: '10em', minHeight: '3.5em', maxWidth: '10em' }}
                        >Get Started</Button>
                    </Card.Body>
                </Card>

            </div>
            <div className="text-center py-3 mt-3" style={{ backgroundColor: '#E9F4F2' }}>
                Powered by Floath Solution Hub
                <p>(+234)8166064166</p>
            </div>

            <SignupModal on={regModal} off={() => setRegModal(false)} />
            <LoginModal on={loginModal} off={() => setLoginModal(false)} />
                </>
            }
        </div>
    )
}
export default HomePage;