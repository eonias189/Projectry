import { JsonHandler } from "./jsonHandlerModel";
import { TFunction, TModule, TObject } from "../translation/types";
import { join, sep } from "path";

export type ProjectData = {
    modules: TModule[];
    objects: TObject[];
    functions: TFunction[];
};

const defaulData: ProjectData = {
    modules: [],
    objects: [],
    functions: [],
};

export class ProjectDataJson extends JsonHandler<ProjectData> {
    constructor(pathToProject: string) {
        super(join(pathToProject, ".projectry", "project-data.json"), defaulData);
    }
}
