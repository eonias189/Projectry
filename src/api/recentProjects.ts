import { config } from "../config";
import {
    RecentProjectHandler,
    Project,
    RecentProjectsJson,
} from "../service/recentProjects";
import { ipcRenderer } from "electron";

const recentProjects = new RecentProjectHandler(config.dataDir);
const connection = recentProjects.getConnection();

export function newProject(
    event: Electron.IpcMainInvokeEvent,
    path: string,
    alive: boolean
): Project {
    return {
        path,
        alive,
    };
}

export function getNewProject(path: string, alive: boolean): Promise<Project> {
    return ipcRenderer.invoke("newProject", path, alive);
}

export function getProjects(
    event: Electron.IpcMainInvokeEvent
): RecentProjectsJson {
    return connection.data;
}

export function getGetProjects(): Promise<RecentProjectsJson> {
    return ipcRenderer.invoke("getProjects");
}

export function addProject(
    event: Electron.IpcMainInvokeEvent,
    project: Project
): undefined {
    connection.data.forEach((prj) => {
        if (project.path == prj.path) {
            throw new Error("Project already exists");
        }
    });
    connection.data.push(project);
    connection.save();
}

export function getAddProject(project: Project): Promise<undefined | void> {
    return ipcRenderer.invoke("addProject", project);
}

export function removeProject(
    event: Electron.IpcMainInvokeEvent,
    path: string
): undefined {
    let lengthWas = connection.data.length;
    connection.data = connection.data.filter(
        (project) => project.path !== path
    );
    if (connection.data.length == lengthWas) {
        throw new Error("project doesn`t exist");
    }
    connection.save();
}

export function getRemoveProject(path: string): Promise<void> {
    return ipcRenderer.invoke("removeProject", path);
}
