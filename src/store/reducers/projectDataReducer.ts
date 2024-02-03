import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectData } from "../../types";
import { UnArray } from "../../utils/typeUtils";
import { addUniqueElement, deleteUniqueElement, editUniqueElement } from "../../utils/reducerUtils";
import { AddElementPayload, ChildrenPayload, EditPayload } from "../../types/projectDataPayloads";

const projectDataSlice = createSlice({
    name: "projectData",
    initialState: {
        modules: [],
        objects: [],
        functions: [],
        interfaces: [],
    } as ProjectData,
    reducers: {
        insertProjectData(state, { payload }: PayloadAction<ProjectData>) {
            return payload;
        },
        addElement(state, { payload }: PayloadAction<AddElementPayload>) {
            return { ...state, [payload.key]: addUniqueElement(state[payload.key], payload.element) };
        },
        deleteElement(state, { payload }: PayloadAction<{ key: keyof ProjectData; id: string }>) {
            const arr = state[payload.key];
            return { ...state, [payload.key]: deleteUniqueElement<UnArray<typeof arr>>(arr, payload.id) };
        },
        addToChildren(state, { payload }: PayloadAction<ChildrenPayload>) {
            const module = state.modules.find((i) => i.id === payload.id);
            if (!module) {
                return;
            }
            const children = module.children[payload.childType];
            if (children.includes(payload.child)) {
                return;
            }
            children.push(payload.child);
        },
        deleteFromChildren(state, { payload }: PayloadAction<ChildrenPayload>) {
            const module = state.modules.find((i) => i.id === payload.id);
            if (!module) {
                return;
            }
            const children = module.children[payload.childType];
            module.children[payload.childType] = children.filter((i) => i !== payload.child);
        },
        editElement(state, { payload }: PayloadAction<EditPayload>) {
            editUniqueElement(state[payload.key], payload.id, payload.newElement);
        },
    },
});

export const projectDataReducer = projectDataSlice.reducer;
export const projectDataActions = projectDataSlice.actions;
