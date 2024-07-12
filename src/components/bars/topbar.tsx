import React from "react";
import { Button } from "react-bootstrap";
import style from './topbar.module.css'

const TopBarUnAuth : React.FC<any> = ({buttonClicked}) => {
    // const navigate = useNavigate();

    const links = [
        {title:'Go-pro', path:''},
        {title:'Explore', path:''},
        {title:'English', path:''},
    ]
    return (
        <div className={`d-flex align-items-center navbar px-5 justify-content-between shadow-sm w-100 ${style.topBar}`}
        style={{minHeight:'70px'}}>
            <h4>tadaa<span className="text-secondary">!</span></h4>
            <div className="d-flex gap-3 align-items-center">
            <ul className="gap-5 m-0 p-0">
                {
                    links.map(link=>(
                        <li className="list-group-item fw-medium" role="button">{link.title}</li>
                    ))
                }
            </ul>
            <Button variant="outline fw-medium border border-1" onClick={buttonClicked}>Sign in</Button>
                <Button className="text-light" onClick={buttonClicked}>Register</Button>
            </div>
        </div>
    )

}
export default TopBarUnAuth;