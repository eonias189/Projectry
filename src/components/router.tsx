import { FC, useEffect } from "react";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "../pages/mainPage";
import DevPage from "../pages/devPage";

interface RouterProps {}

const RedirectToMainPage: FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
    });
    return (
        <div>
            <h1>Redirecting to main page</h1>
        </div>
    );
};

const Router: FC<RouterProps> = ({}) => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/dev/:project_name" element={<DevPage />} />
                <Route path="/dev/" element={<RedirectToMainPage />} />
            </Routes>
        </HashRouter>
    );
};

export default Router;
