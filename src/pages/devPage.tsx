import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface DevPageProps {}

const DevPage: FC<DevPageProps> = ({}) => {
    const { project_name } = useParams<{ project_name: string }>();
    const navigate = useNavigate();
    const toMainPage = () => {
        navigate("/");
    };
    return (
        <>
            <p>Dev Page</p>
            <p>Project name: {project_name!}</p>
            <button onClick={toMainPage}>To main page</button>
        </>
    );
};

export default DevPage;
