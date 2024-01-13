import { FC, useState } from "react";
import styles from "./newProjectModal.module.css";
import InputField from "./UI/inputField";
import Btn from "./UI/btn";
import { openIcon } from "./UI/icons";
import { addProject } from "../manageState/projects";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { PROJECTS_DEFAULT_LIMIT } from "../assets";

interface NewProjectModalProps {
    close(): void;
}

const NewProjectModal: FC<NewProjectModalProps> = ({ close }) => {
    const dispatch = useAppDispatch();
    const projectsLen = useAppSelector((store) => store.projects.length);
    const [project, setProject] = useState<{ name: string; path: string; message: string }>({
        name: "",
        path: "",
        message: "",
    });
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
                    <span
                        className={styles.chooseFolderBtn}
                        onClick={(e) => {
                            e.preventDefault();
                            api()
                                .chooseFolder()
                                .then((path) => setProject({ ...project, path }));
                        }}
                    >
                        {openIcon}
                    </span>
                </div>
            </div>

            <p className={styles.errorMessage}>{project.message}</p>

            <Btn
                className={styles.createBtn}
                onClick={async (e) => {
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
                }}
            >
                Create
            </Btn>
        </form>
    );
};

export default NewProjectModal;
