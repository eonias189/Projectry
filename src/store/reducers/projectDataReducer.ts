import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import { ProjectData, TFunction, TModule, TObject } from "../../types";

const projectDataSlice = createSlice({
    name: "projectData",
    initialState: {
        modules: [],
        objects: [],
        functions: [],
    } as ProjectData,
    reducers: {
        insertProjectData(
            state,
            { payload: { projectData } }: PayloadAction<{ projectData: ProjectData }>
        ) {
            return projectData;
        },
        addModule(state, { payload: { module } }: PayloadAction<{ module: TModule }>) {
            return { ...state, modules: [...state.modules, module] };
        },
        addObject(
            state,
            { payload: { object, moduleID } }: PayloadAction<{ object: TObject; moduleID: string }>
        ) {
            const module = state.modules.find((mod) => mod.moduleID === moduleID);
            if (module) {
                module.objectsID.push(object.objectID);
                state.objects.push(object);
            }
        },
        addFunction(
            state,
            { payload: { func, moduleID } }: PayloadAction<{ func: TFunction; moduleID: string }>
        ) {
            const module = state.modules.find((mod) => mod.moduleID === moduleID);
            if (module) {
                module.functionsID.push(func.functionID);
                state.functions.push(func);
            }
        },
        addMethod(
            state,
            { payload: { method, objectID } }: PayloadAction<{ method: TFunction; objectID: string }>
        ) {
            const object = state.objects.find((obj) => obj.objectID === objectID);
            if (object) {
                object.methodsID.push(method.functionID);
                state.functions.push(method);
            }
        },
        deleteModule(state, { payload: { moduleID } }: PayloadAction<{ moduleID: string }>) {
            const newModules = state.modules.filter((module) => module.moduleID !== moduleID);
            return { ...state, modules: newModules };
        },
        deleteObject(state, { payload: { objectID } }: PayloadAction<{ objectID: string }>) {
            const module = state.modules.find((mod) => mod.objectsID.includes(objectID));
            if (module) {
                state.objects = state.objects.filter((object) => object.objectID !== objectID);
                module.objectsID = module.objectsID.filter((objID) => objID !== objectID);
            }
        },
        deleteFunction(state, { payload: { functionID } }: PayloadAction<{ functionID: string }>) {
            const module = state.modules.find((mod) => mod.functionsID.includes(functionID));
            if (module) {
                module.functionsID = module.functionsID.filter((funcID) => funcID !== functionID);
                state.functions = state.functions.filter((func) => func.functionID !== functionID);
            }
        },
        deleteMethod(state, { payload: { methodID } }: PayloadAction<{ methodID: string }>) {
            const object = state.objects.find((obj) => obj.methodsID.includes(methodID));
            if (object) {
                object.methodsID = object.methodsID.filter((metID) => metID !== methodID);
                state.functions = state.functions.filter((func) => func.functionID !== methodID);
            }
        },
        replaceObject(
            state,
            {
                payload: { objectID, lastModuleID, newModuleID },
            }: PayloadAction<{ objectID: string; lastModuleID: string; newModuleID: string }>
        ) {
            const lastModule = state.modules.find((module) => module.moduleID === lastModuleID);
            if (lastModule) {
                lastModule.objectsID = lastModule.objectsID.filter((objID) => objID !== objID);
            }
            const newModule = state.modules.find((module) => module.moduleID === newModuleID);
            if (newModule) {
                newModule.objectsID.push(objectID);
            }
        },
    },
});

export const projectDataReducer = projectDataSlice.reducer;
export const projectDataActions = projectDataSlice.actions;
