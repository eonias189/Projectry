import { combineReducers } from "redux";
import { AllProjectsReducer } from "./allProjectsReducer";
import { projectDataReducer } from "./projectDataReducer";

export const rootReducer = combineReducers({
    allProjects: AllProjectsReducer,
    projectData: projectDataReducer,
});
