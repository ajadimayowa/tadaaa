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
            <div 
            className="text-center footer sticky-bottom py-2 mt-3" 
            style={{ backgroundColor: '#E9F4F2', display:'absolute', bottom:'0px' }}>
                Powered by Floath Solution Hub
                <p>(+234)8166064166</p>
            </div>
        </div>
    )

}
export default DashboardContainer;