import React from "react";
import { Button } from "react-bootstrap";
import style from './topbar.module.css';
import logo from '../../assets/svgs/logo-wok9ja.svg'
import { fundingURL } from "../../app/config";
import { useNavigate } from "react-router-dom";

const TopBarUnAuth: React.FC<any> = ({ loginClicked, togSide, signUpClicked }) => {
    const navigate = useNavigate();

    const links = [
        { title: 'Go-pro', path: '' },
        { title: 'Explore', path: '' },
    ]
    return (
        <div className={`navbar sticky-top px-4 bg-primary text-light align-items-center justify-content-between w-100 ${style.topBar}`}
            style={{ minHeight: '75px' }}>
                <div className="d-flex w-100 align-items-center justify-content-between">
               <span onClick={togSide}> <i className="menu bi bi-list fs-1" id="menu" role="button"></i> </span>
            <img className="" role="button" src={logo} height={50} onClick={()=>navigate('/')}/>
            <div className="d-flex gap-5 align-items-center">
                <ul className="gap-5 m-0 p-0">
                    {
                        links.map((link,index) => (
                            <li key={index} className="list-group-item fw-medium" role="button">{link.title}</li>
                        ))
                        
                    }
                    <li onClick={loginClicked} className="list-group-item fw-medium" role="button">Login</li>
                </ul>
                <div className="d-flex gap-3 align-items-center">
                <Button className=" bg-secondary px-3 fw-bold text-light" onClick={signUpClicked}>Sign up</Button>
                <i className="bi bi-globe " role="button"></i>
                </div>
                
                
            </div>
            </div>
            
            <p className="p-0 m-0 mt-3 w-100 text-center text-light">We Need Funding kindly  <a style={{textDecoration:'none'}} className="text-secondary text-center m-1" role="button" href={fundingURL}>Tap here </a> to support us.</p>
            
        </div>
    )

}
export default TopBarUnAuth;