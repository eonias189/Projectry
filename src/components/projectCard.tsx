import { FC } from "react";
import { Project } from "../types";
import styles from "./projectCard.module.css";
import Btn from "./UI/btn";
import IconBtn from "./UI/iconBtn";
import ActionList from "./actionList";

interface ProjectCardProps {
    project: Project;
}

const getDate = (date: Date): string => {
    const now = new Date();
    const dayDelta = (now.getTime() - date.getTime()) / 1000 / 3600 / 24;
    if (dayDelta >= 365) {
        return `${Math.ceil(dayDelta / 365)} years ago`;
    } else if (dayDelta >= 30) {
        return `${Math.ceil(dayDelta / 30.5)} months ago`;
    } else if (now.getDate() !== date.getDate()) {
        return `${Math.ceil(dayDelta)} days ago`;
    } else {
        return "today";
    }
};

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
    const lastEditingDate = new Date(project.lastEditingDate);
    return (
        <div className={styles.card}>
            <div className={styles.infoArea}>
                <p className={styles.name}>Name: {project.name}</p>
                <p className={styles.path}>path: {project.path}</p>
                <p className={styles.date}>last edited: {getDate(lastEditingDate)}</p>
            </div>
            <div className={styles.actionArea}>
                <ActionList
                    primaryElement={
                        <IconBtn>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16"
                                width="14"
                                viewBox="0 0 448 512"
                            >
                                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                            </svg>
                        </IconBtn>
                    }
                    actions={[
                        <Btn className={styles.actionButton}>Delete</Btn>,
                        <Btn className={styles.actionButton}>Open</Btn>,
                    ]}
                />
            </div>
        </div>
    );
};

export default ProjectCard;
