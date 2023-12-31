import { config } from "../config";
import {
    RecentProjectHandler,
    Project,
    RecentProjectsJson,
} from "../jsonStorage/recentProjects";
import { ipcRenderer } from "electron";
import { getApiFunc } from "./apiFunc";

const recentProjects = new RecentProjectHandler(config.dataDir);

async function newProjectHandler(
    event: Electron.IpcMainInvokeEvent,
    path: string,
    alive: boolean
): Promise<Project> {
    return {
        path,
        alive,
    };
}

async function getProjectsHandler(
    event: Electron.IpcMainInvokeEvent
): Promise<RecentProjectsJson> {
    return (await recentProjects.getConnection()).data;
}

async function addProjectHandler(
    event: Electron.IpcMainInvokeEvent,
    project: Project
): Promise<void> {
    let connection = await recentProjects.getConnection();
    connection.data.forEach((prj) => {
        if (project.path == prj.path) {
            throw new Error("Project already exists");
        }
    });
    connection.data.push(project);
    await connection.save();
}

async function removeProjectHandler(
    event: Electron.IpcMainInvokeEvent,
    path: string
): Promise<void> {
    let connection = await recentProjects.getConnection();
    let lengthWas = connection.data.length;
    connection.data = connection.data.filter(
        (project) => project.path !== path
    );
    if (connection.data.length == lengthWas) {
        throw new Error("project doesn`t exist");
    }
    await connection.save();
}

export const newProject = getApiFunc(newProjectHandler);
export const getProjects = getApiFunc(getProjectsHandler);
export const addProject = getApiFunc(addProjectHandler);
export const removeProject = getApiFunc(removeProjectHandler);
