import { Outlet } from "react-router-dom";
import { useState } from "react";
import TopBarAuth from "../../components/bars/topbarAuth";
import SideBarAuth from "../../components/bars/sidebarAuth";

const DashboardContainer = ()=>{
    // const [regModal, setRegModal] = useState(false);
    const [onSideNav, setOnSideNav] = useState(false);
    return (
        <div>
            
            
            <div>
            <TopBarAuth togSide={() => setOnSideNav(!onSideNav)} />
            </div>
            <div>
            <SideBarAuth  toggleSideBar={() => setOnSideNav(!onSideNav)} onSideBar={onSideNav} />
            </div>
            <main className="p-2">{<Outlet/>}</main>
            <div>footer</div>
        </div>
    )

}
export default DashboardContainer;