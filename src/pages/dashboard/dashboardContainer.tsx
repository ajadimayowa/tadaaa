import { Outlet } from "react-router-dom";
import SideBarUnAuth from "../../components/bars/sidebar";
import { useState } from "react";
import TopBarAuth from "../../components/bars/topbarAuth";

const DashboardContainer = ()=>{
    // const [regModal, setRegModal] = useState(false);
    const [onSideNav, setOnSideNav] = useState(false);
    return (
        <div>
            
            
            <div>
            <TopBarAuth togSide={() => setOnSideNav(!onSideNav)} />
            </div>
            <div>
            <SideBarUnAuth  toggleSideBar={() => setOnSideNav(!onSideNav)} onSideBar={onSideNav} />
            </div>
            <main>{<Outlet/>}</main>
            <div>footer</div>
        </div>
    )

}
export default DashboardContainer;