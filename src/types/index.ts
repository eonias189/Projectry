import { Unpormise, UnArray } from "../utils";
export type ApiType = ReturnType<typeof api>;
export type Project = Unpormise<ReturnType<ApiType["newProject"]>>;
export type ProjectData = Unpormise<ReturnType<ApiType["getProjectData"]>>;
export type TModule = UnArray<ProjectData["modules"]>;
export type TObject = UnArray<ProjectData["objects"]>;
export type TFunction = UnArray<ProjectData["functions"]>;
