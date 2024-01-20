import { FC, useState, MouseEvent } from "react";
import styles from "./newProjectModal.module.css";
import InputField from "../UI/inputField";
import Btn from "../UI/btn";
import { openIcon } from "../UI/icons";
import { addProject } from "../../manageState/allProjects";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { PROJECTS_DEFAULT_LIMIT } from "../../assets";

interface NewProjectModalProps {
    close(): void;
}

const NewProjectModal: FC<NewProjectModalProps> = ({ close }) => {
    const dispatch = useAppDispatch();
    const projectsLen = useAppSelector((store) => store.allProjects.length);
    const [project, setProject] = useState<{ name: string; path: string; message: string }>({
        name: "",
        path: "",
        message: "",
    });

    const handleChooseFolder = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        api()
            .chooseFolder()
            .then((path) => setProject({ ...project, path }));
    };

    const handleCreateProject = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        const resp = await addProject(
            dispatch,
            await api().newProject(project.name, project.path),
            () => projectsLen < PROJECTS_DEFAULT_LIMIT
        );
        setProject({ ...project, message: resp.message });
        if (resp.ok) {
            close();
        }
    };

    return (
        <form className={styles.formContainer}>
            <p className={styles.info}>Create project</p>
            <div className={styles.inputArea}>
                <InputField
                    className={styles.inputField}
                    placeholder="name"
                    value={project.name}
                    onChange={(e) => setProject({ ...project, name: e.currentTarget.value })}
                />
                <div className={styles.pathArea}>
                    <InputField
                        className={styles.inputField}
                        placeholder="path"
                        value={project.path}
                        onChange={(e) => setProject({ ...project, path: e.currentTarget.value })}
                    />
                    <span className={styles.chooseFolderBtn} onClick={handleChooseFolder}>
                        {openIcon}
                    </span>
                </div>
            </div>

            <p className={styles.errorMessage}>{project.message}</p>

            <Btn className={styles.createBtn} onClick={handleCreateProject}>
                Create
            </Btn>
        </form>
    );
};

export default NewProjectModal;
