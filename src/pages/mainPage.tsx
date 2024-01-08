import { FC, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import useFetcher from "../hooks/useFetcher";
import styles from "./mainPage.module.css";
import Btn from "../components/UI/btn";
import ProjectCard from "../components/projectCard";
import { useModalWindow } from "../hooks/useModalWindow";
import NewProjectModal from "../components/newProjectModal";
interface MainPageProps {}

const MainPage: FC<MainPageProps> = ({}) => {
    const navigate = useNavigate();
    const ProjectsDefaultLimit = 5;
    const [projects, projectsAreLoading, err] = useFetcher(
        () => api().getProjects(ProjectsDefaultLimit),
        []
    );
    const [openNewProjectModal, newProjectModal] = useModalWindow(<NewProjectModal />);

    return (
        <div className={styles.mainPage}>
            <div className={styles.header}>
                <p>Projectry</p>
                <div className={styles.actionButtons}>
                    <Btn
                        onClick={() => {
                            openNewProjectModal();
                        }}
                    >
                        New project
                    </Btn>
                    {newProjectModal}
                </div>
            </div>
            <div className={styles.projectsContainer}>
                {projects.map((project, id) => (
                    <ProjectCard project={project} key={id} />
                ))}
            </div>
            <div className={styles.footer}>
                <Btn>show all projects</Btn>
            </div>
        </div>
    );
};

export default MainPage;
