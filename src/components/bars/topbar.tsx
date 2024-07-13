import React from "react";
import { Button } from "react-bootstrap";
import style from './topbar.module.css';
import logo from '../../assets/svgs/logo-wok9ja.svg'

const TopBarUnAuth: React.FC<any> = ({ buttonClicked }) => {
    // const navigate = useNavigate();

    const links = [
        { title: 'Go-pro', path: '' },
        { title: 'Explore', path: '' },
    ]
    return (
        <div className={`d-flex px-4 bg-primary text-light align-items-center navbar justify-content-between w-100 ${style.topBar}`}
            style={{ minHeight: '70px' }}>
            <img className="" src={logo} height={27} />
            {/* <h4>wok9ja<span className="text-secondary">!</span></h4> */}
            <div className="d-flex gap-5 align-items-center">
                <ul className="gap-5 m-0 p-0">
                    {
                        links.map(link => (
                            <li className="list-group-item fw-medium" role="button">{link.title}</li>
                        ))
                    }
                </ul>
                <span className="fw-medium" role="button" onClick={buttonClicked}>Sign in</span>
                <div className="d-flex gap-3 align-items-center">
                <Button className=" bg-secondary px-3 fw-bold text-light" onClick={buttonClicked}>Join</Button>
                <i className="bi bi-globe " role="button"></i>
                </div>
                
                
            </div>
        </div>
    )

}
export default TopBarUnAuth;