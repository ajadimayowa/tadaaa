import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import DashboardContainer from "./pages/dashboard/dashboardContainer";
import DashboardPage from "./pages/dashboard/dashboardPage";
import ErrorPage from "./pages/unsecured/error-page";
import './custom.scss'
import CreateServicePage from "./pages/dashboard/create-service-page";
import KycPage from "./pages/dashboard/kyc-page";


export default () => {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardContainer />}>
                <Route index element={<DashboardPage />} />
                <Route path="create-service/:username" element={<CreateServicePage />} />
                <Route path="complete-kyc/:username" element={<KycPage />} />
            </Route>
        </Routes>
    )
}