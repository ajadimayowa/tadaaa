import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import './custom.scss'


export default () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    )
}