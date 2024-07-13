import { useState } from "react";
import SignupModal from "../components/modals/signupmodal";
import { Button} from "react-bootstrap";
import TopBarUnAuth from "../components/bars/topbar";
import team from '../assets/svgs/team.svg';
import './index.css'
const HomePage = () => {
    const [regModal, setRegModal] = useState(false)


    return (
        <div className="">
            <div className="cont bg-primary text-light">
                <TopBarUnAuth buttonClicked={() => setRegModal(true)} />
                <div className={`sectOne gap-5 mt-4 px-4`}>
                    <div className="left bg-primary">
                        <h5 className="fw-bolder">
                            Empowering Nigerians with
                            <br />
                            Remote Work Opportunities
                            <br />
                            and Connections.
                        </h5>
                        <p>
                            Work9ja connects Nigerian professionals
                            with remote
                            work opportunities, <br/> providing a seamless platform
                            for job seekers and  employers <br /> to   collaborate
                            and thrive in a flexible work environment.
                        </p>
                        <Button className="bg-secondary text-light"
                        style={{minWidth:'10em', minHeight:'3.5em'}}
                        >Get Started</Button>
                    </div>
                    <div className="right">
                        <img className="w-100" src={team}/>
                    </div>
                </div>

            </div>
            <SignupModal on={regModal} off={() => setRegModal(false)} />

        </div>
    )
}
export default HomePage;