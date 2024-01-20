import { join } from "path";
import { JsonHandler } from "./jsonHandlerModel";

export type Project = {
    id: string;
    name: string;
    path: string;
    lastEditingDate: number;
};

export type AllProjectsJson = Array<Project>;

const defaulData: AllProjectsJson = [];

const filename = "all-projects.json";
export class RecentProjectHandler extends JsonHandler<AllProjectsJson> {
    constructor(dataDir: string) {
        super(join(dataDir, filename), defaulData);
    }
}
