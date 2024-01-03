import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./devPage.module.css";

interface DevPageProps {}

const DevPage: FC<DevPageProps> = ({}) => {
    const { project_name } = useParams<{ project_name: string }>();
    const [choosenFile, setChoosenFile] = useState<string>("");
    const navigate = useNavigate();
    const toMainPage = () => {
        navigate("/");
    };
    return (
        <div className={styles.devPage}>
            <p>Dev Page</p>
            <p>Project name: {project_name!}</p>
            <button onClick={toMainPage}>To main page</button>
            <button
                onClick={() => {
                    api().chooseFolder().then(setChoosenFile);
                }}
            >
                {choosenFile || "choose folder"}
            </button>
        </div>
    );
};

export default DevPage;
