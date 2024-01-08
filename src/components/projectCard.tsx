import { FC } from "react";
import { Project } from "../types";
import styles from "./projectCard.module.css";
import Btn from "./UI/btn";
import IconBtn from "./UI/iconBtn";
import DropDown from "./dropDown";
import { cancelIcon, deleteIcon, editIcon, okIcon, openIcon, settingsIcon } from "./UI/icons";
import useEditAble from "../hooks/useEditable";

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
    const [{ name }, editaAbleName, isAditing, startEdit, finishEdit, cancelEdit] = useEditAble({
        name: project.name,
    });
    const openBtn = <IconBtn>{openIcon}</IconBtn>;
    const editBtn = (
        <IconBtn
            onClick={() => {
                startEdit();
            }}
        >
            {editIcon}
        </IconBtn>
    );
    const deleteBtn = <IconBtn>{deleteIcon}</IconBtn>;
    const okBtn = (
        <IconBtn
            onClick={() => {
                finishEdit();
            }}
        >
            {okIcon}
        </IconBtn>
    );
    const cancelBtn = (
        <IconBtn
            onClick={() => {
                cancelEdit();
            }}
        >
            {cancelIcon}
        </IconBtn>
    );
    return (
        <div className={styles.card}>
            <div className={styles.infoArea}>
                <div className={styles.name}>{editaAbleName}</div>
                <p className={styles.path}>path: {project.path}</p>
                <p className={styles.date}>last edited: {getDate(lastEditingDate)}</p>
            </div>
            <div className={styles.actionArea}>
                {openBtn}
                <div className={styles.fixer}>
                    <DropDown expandElement={settingsIcon} className={styles.fix}>
                        {isAditing ? (
                            <>
                                {okBtn}
                                {cancelBtn}
                            </>
                        ) : (
                            <>
                                {editBtn}
                                {deleteBtn}
                            </>
                        )}
                    </DropDown>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
