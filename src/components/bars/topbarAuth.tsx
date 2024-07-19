import React from "react";
import style from './topbar.module.css';
import logo from '../../assets/svgs/logo-wok9ja.svg'

const TopBarAuth: React.FC<any> = ({ togSide }) => {
    // const navigate = useNavigate();

    const links = [
        { title: 'Go-pro', path: '' },
        { title: 'Explore', path: '' },
    ]
    return (
        <div className={`navbar sticky-top px-4 bg-primary text-light align-items-center justify-content-between w-100 ${style.topBar}`}
            style={{ minHeight: '70px' }}>
               <span onClick={togSide}> <i className="menu bi bi-list fs-1" id="menu" role="button"></i> </span>
            <img className="" src={logo} height={27} />
            <div className="d-flex gap-5 align-items-center">
                <ul className="gap-5 m-0 p-0">
                    {
                        links.map(link => (
                            <li className="list-group-item fw-medium" role="button">{link.title}</li>
                        ))
                    }
                </ul>
                <div className="d-flex gap-3 align-items-center">
                <i className="bi bi-person-circle p-0" style={{fontSize:'1.3em'}}></i>
                </div>
                
                
            </div>
        </div>
    )

}
export default TopBarAuth;