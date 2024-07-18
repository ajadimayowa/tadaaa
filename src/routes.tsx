import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import DashboardContainer from "./pages/dashboard/dashboardContainer";
import DashboardPage from "./pages/dashboard/dashboardPage";
import './custom.scss'


export default () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<DashboardContainer />}>
                <Route index element={<DashboardPage />} />
            </Route>
        </Routes>
    )
}