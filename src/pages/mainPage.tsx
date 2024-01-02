import React, { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MainPageProps {}

const MainPage: FC<MainPageProps> = ({}) => {
    const navigate = useNavigate();
    const [project_name, setProjectName] = useState<string>("");

    return (
        <>
            <p>Main page</p>
            <input
                value={project_name}
                onChange={(e: FormEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setProjectName(e.currentTarget.value);
                }}
            />
            <button
                onClick={() => {
                    navigate(`/dev/${project_name}`);
                }}
            >
                To dev page
            </button>
        </>
    );
};

export default MainPage;
