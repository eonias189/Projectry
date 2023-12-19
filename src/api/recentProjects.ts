import { config } from "../config";
import {
    RecentProjectHandler,
    Project,
    RecentProjectsJson,
} from "../jsonStorage/recentProjects";
import { ipcRenderer } from "electron";
import { getApiFunc } from "./apiFunc";

const recentProjects = new RecentProjectHandler(config.dataDir);
const connection = recentProjects.getConnection();

function newProjectHandler(
    event: Electron.IpcMainInvokeEvent,
    path: string,
    alive: boolean
): Project {
    return {
        path,
        alive,
    };
}

function getProjectsHandler(
    event: Electron.IpcMainInvokeEvent
): RecentProjectsJson {
    return connection.data;
}

function addProjectHandler(
    event: Electron.IpcMainInvokeEvent,
    project: Project
): void {
    connection.data.forEach((prj) => {
        if (project.path == prj.path) {
            throw new Error("Project already exists");
        }
    });
    connection.data.push(project);
    connection.save();
}

function removeProjectHandler(
    event: Electron.IpcMainInvokeEvent,
    path: string
): void {
    let lengthWas = connection.data.length;
    connection.data = connection.data.filter(
        (project) => project.path !== path
    );
    if (connection.data.length == lengthWas) {
        throw new Error("project doesn`t exist");
    }
    connection.save();
}

export const newProject = getApiFunc(newProjectHandler);
export const getProjects = getApiFunc(getProjectsHandler);
export const addProject = getApiFunc(addProjectHandler);
export const removeProject = getApiFunc(removeProjectHandler);
