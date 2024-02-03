import { JsonHandler } from "./jsonHandlerModel";
import { TFunction, TInterface, TModule, TObject } from "../translation/types";
import { join, sep } from "path";

export type ProjectData = {
    modules: TModule[];
    objects: TObject[];
    functions: TFunction[];
    interfaces: TInterface[];
};

const defaulData: ProjectData = {
    modules: [],
    objects: [],
    functions: [],
    interfaces: [],
};

export class ProjectDataJson extends JsonHandler<ProjectData> {
    constructor(pathToProject: string) {
        super(join(pathToProject, ".projectry", "project-data.json"), defaulData);
    }
}
