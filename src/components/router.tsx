import React, { FC } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/mainPage";
import DevPage from "../pages/devPage";

interface RouterProps {}

const Router: FC<RouterProps> = ({}) => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/dev/:project_name" element={<DevPage />} />
            </Routes>
        </HashRouter>
    );
};

export default Router;
