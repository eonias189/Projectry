import { FC, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./mainPage.module.css";
import Btn from "../components/UI/btn";
import ProjectCard from "../components/projectCard";
import { useModalWindow } from "../hooks/useModalWindow";
import NewProjectModal from "../components/newProjectModal";
import { fetchProjects } from "../manageState/allProjects";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import useLoader from "../hooks/useLoader";
import { PROJECTS_DEFAULT_LIMIT } from "../assets";
interface MainPageProps {}

const MainPage: FC<MainPageProps> = ({}) => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector((store) => store.allProjects);
    const [projectsAreLoading, projectLoader] = useLoader();

    useEffect(() => {
        projectLoader.load(() => fetchProjects(dispatch, PROJECTS_DEFAULT_LIMIT));
    }, []);

    const [openNewProjectModal, closeNewProjectModal, getNewProjectModal] = useModalWindow();
    const newProjectModal = getNewProjectModal(<NewProjectModal close={closeNewProjectModal} />);

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
                {projects.map((project) => (
                    <ProjectCard project={project} key={project.id} />
                ))}
            </div>
            <div className={styles.footer}>
                <Btn onClick={() => projectLoader.load(() => fetchProjects(dispatch))}>
                    show all projects
                </Btn>
            </div>
        </div>
    );
};

export default MainPage;
