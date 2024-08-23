import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import DashboardContainer from "./pages/dashboard/dashboardContainer";
import DashboardPage from "./pages/dashboard/dashboardPage";
import ErrorPage from "./pages/unsecured/error-page";
import './custom.scss'
import CreateServicePage from "./pages/dashboard/create-gig-page";
import KycPage from "./pages/dashboard/kyc-page";
import OtpVerificationPage from "./pages/unsecured/verification-page";
import CategoryViewPage from "./pages/unsecured/category-view-page";


export default () => {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/verify" element={<OtpVerificationPage />} />
            <Route path="/category-view/:id" element={<CategoryViewPage />} />
            <Route path="/dashboard" element={<DashboardContainer />}>
                <Route index element={<DashboardPage />} />
                <Route path="create-gig/:userId" element={<CreateServicePage />} />
                <Route path="complete-kyc/:userId" element={<KycPage />} />
            </Route>
        </Routes>
    )
}