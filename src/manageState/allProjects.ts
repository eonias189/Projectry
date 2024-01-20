import { AppDispatch } from "../store/store";
import { AllProjectsActions } from "../store/reducers/allProjectsReducer";
import { ApiType, Project } from "../types";
import { PROJECTS_DEFAULT_LIMIT } from "../assets";

export const fetchProjects = async (dispatch: AppDispatch, limit?: number) => {
    const projects = await api().getProjects(limit);
    const action = AllProjectsActions.insertProjects({ projects });
    dispatch(action);
};

type AddProjectResp = {
    ok: boolean;
    message: string;
};

export const addProject = async (
    dispatch: AppDispatch,
    project: Project,
    addToStorage: boolean | (() => boolean)
): Promise<AddProjectResp> => {
    try {
        await api().addProject(project);
    } catch (err) {
        if (err instanceof Error) return { message: err.message, ok: false };
        return { message: "unknown error", ok: false };
    }
    if (typeof addToStorage == "boolean" || addToStorage()) {
        const action = AllProjectsActions.addProject({ project });
        dispatch(action);
    }
    return { message: "", ok: true };
};

export const deleteProject = async (dispatch: AppDispatch, id: string): Promise<void> => {
    try {
        await api().removeProject(id);
    } catch (err) {
        return;
    }
    const action = AllProjectsActions.deleteProject({ id });
    dispatch(action);
};

export const editProject = async (dispatch: AppDispatch, id: string, newName: string): Promise<void> => {
    await api().editProjectName(id, newName);
    const action = AllProjectsActions.editProject({ id, newName });
    dispatch(action);
};
