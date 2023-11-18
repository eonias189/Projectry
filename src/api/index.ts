import {
    newProject,
    getNewProject,
    getProjects,
    getGetProjects,
    addProject,
    getAddProject,
    removeProject,
    getRemoveProject,
} from "./recentProjects";

export const api = () => ({
    newProject: getNewProject,
    getProjects: getGetProjects,
    addProject: getAddProject,
    removeProject: getRemoveProject,
});

export const apiHandlers = [newProject, getProjects, addProject, removeProject];
