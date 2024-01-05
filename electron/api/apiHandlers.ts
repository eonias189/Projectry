import { config } from "../config";
import { RecentProjectHandler, Project, AllProjectsJson } from "../jsonStorage/AllProjects";
import { MainWindow } from "../application/mainWindow";
import { dialog } from "electron";
import { join } from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

const recentProjects = new RecentProjectHandler(config.dataDir);

export async function newProject(
    event: Electron.IpcMainInvokeEvent,
    name: string,
    path: string
): Promise<Project> {
    return {
        name,
        path,
        lastEditingDate: Date.now(),
    };
}

export async function getProjects(
    event: Electron.IpcMainInvokeEvent,
    limit?: number
): Promise<AllProjectsJson> {
    const connection = await recentProjects.getConnection();
    limit = Math.min(limit ?? connection.data.length + 1, connection.data.length);
    return connection.data.slice(0, limit);
}

export async function addProject(event: Electron.IpcMainInvokeEvent, project: Project): Promise<void> {
    let connection = await recentProjects.getConnection();
    connection.data.forEach((prj) => {
        if (project.path == prj.path) {
            throw new Error("Project already exists");
        }
    });
    connection.data.push(project);
    await connection.save();
}

export async function removeProject(event: Electron.IpcMainInvokeEvent, path: string): Promise<void> {
    let connection = await recentProjects.getConnection();
    let lengthWas = connection.data.length;
    connection.data = connection.data.filter((project) => project.path !== path);
    if (connection.data.length == lengthWas) {
        throw new Error("project doesn`t exist");
    }
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
