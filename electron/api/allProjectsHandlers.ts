import { config } from "../config";
import { RecentProjectHandler, Project, AllProjectsJson } from "../jsonStorage/AllProjects";
import { MainWindow } from "../application/mainWindow";
import { dialog } from "electron";
import { join } from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import * as cr from "crypto";

const recentProjects = new RecentProjectHandler(config.dataDir);

export function newProject(event: Electron.IpcMainInvokeEvent, name: string, path: string): Project {
    return {
        name,
        path,
        id: cr.randomUUID(),
        lastEditingDate: Date.now(),
    };
}

export async function getProjects(
    event: Electron.IpcMainInvokeEvent,
    limit?: number
): Promise<AllProjectsJson> {
    const connection = await recentProjects.getConnection();
    limit = Math.min(limit ?? connection.data.length, connection.data.length);
    return connection.data.slice(0, limit);
}

export async function addProject(event: Electron.IpcMainInvokeEvent, project: Project): Promise<void> {
    let connection = await recentProjects.getConnection();
    connection.data.forEach((prj) => {
        if (prj.path === project.path) {
            throw new Error(`project ${prj.name} already exists at ${project.path}`);
        }
    });
    connection.data.push(project);
    await connection.save();
}

export async function removeProject(event: Electron.IpcMainInvokeEvent, id: string): Promise<void> {
    let connection = await recentProjects.getConnection();
    let lengthWas = connection.data.length;
    connection.data = connection.data.filter((project) => project.id !== id);
    if (connection.data.length == lengthWas) {
        throw new Error("project doesn`t exist");
    }
    await connection.save();
}

export async function editProjectName(event: Electron.IpcMainInvokeEvent, id: string, newName: string) {
    const connection = await recentProjects.getConnection();
    connection.data = connection.data.map((project) =>
        project.id === id ? { ...project, name: newName } : project
    );
    await connection.save();
}

export async function chooseFolder(e: Electron.IpcMainInvokeEvent): Promise<string> {
    const mw = MainWindow.getInstance(config, false);
    const resp = await dialog.showOpenDialog(mw.window, {
        properties: ["openDirectory"],
    });
    return resp.filePaths.length ? resp.filePaths[0] : "";
}

export async function createFile(
    e: Electron.IpcMainInvokeEvent,
    path: string,
    fileName: string,
    data: string
): Promise<void> {
    if (!existsSync(path)) {
        await mkdir(path);
    }
    await writeFile(join(path, fileName), data);
}
