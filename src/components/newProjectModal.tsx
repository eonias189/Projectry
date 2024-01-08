import { FC, useState } from "react";
import styles from "./newProjectModal.module.css";
import InputField from "./UI/inputField";
import Btn from "./UI/btn";
import IconBtn from "./UI/iconBtn";
import { openIcon } from "./UI/icons";
import { error } from "console";

interface NewProjectModalProps {}

const NewProjectModal: FC<NewProjectModalProps> = () => {
    const [project, setProject] = useState<{ name: string; path: string; error?: Error }>({
        name: "",
        path: "",
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

            <p className={styles.errorMessage}>{project.error?.message ?? ""}</p>

            <Btn
                className={styles.createBtn}
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                Create
            </Btn>
        </form>
    );
};

export default NewProjectModal;
