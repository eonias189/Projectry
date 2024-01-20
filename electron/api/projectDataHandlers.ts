import { ProjectData, ProjectDataJson } from "../jsonStorage/projectData";

export const getProjectData = async (
    event: Electron.IpcMainInvokeEvent,
    pathToProject: string
): Promise<ProjectData> => {
    const jsonHandler = new ProjectDataJson(pathToProject);
    const connection = await jsonHandler.getConnection();
    return connection.data;
};
