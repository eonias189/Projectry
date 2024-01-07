import { FC } from "react";
import { Project } from "../types";
import styles from "./projectCard.module.css";
import Btn from "./UI/btn";
import IconBtn from "./UI/iconBtn";
import DropDown from "./dropDown";
import { deleteIcon, editIcon, openIcon, settingsIcon } from "./UI/icons";

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
                <p className={styles.name}>{project.name}</p>
                <p className={styles.path}>path: {project.path}</p>
                <p className={styles.date}>last edited: {getDate(lastEditingDate)}</p>
            </div>
            <div className={styles.actionArea}>
                <IconBtn>{openIcon}</IconBtn>
                <div className={styles.fixer}>
                    <DropDown expandElement={settingsIcon} className={styles.fix}>
                        <IconBtn>{deleteIcon}</IconBtn>
                        <IconBtn>{editIcon}</IconBtn>
                    </DropDown>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
