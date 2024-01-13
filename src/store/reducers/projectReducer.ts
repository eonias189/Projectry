import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../types";

const projectSlice = createSlice({
    name: "projects",
    initialState: [] as Project[],
    reducers: {
        addProject(state, { payload: { project } }: PayloadAction<{ project: Project }>) {
            state.push(project);
        },
        insertProjects(state, { payload: { projects } }: PayloadAction<{ projects: Project[] }>) {
            return projects;
        },
        editProject(state, { payload: { id, newName } }: PayloadAction<{ id: string; newName: string }>) {
            return state.map((project) => (project.id === id ? { ...project, name: newName } : project));
        },
        deleteProject(state, { payload: { id } }: PayloadAction<{ id: string }>) {
            return state.filter((project) => project.id !== id);
        },
    },
});

export const projectReducer = projectSlice.reducer;
export const projectActions = projectSlice.actions;
