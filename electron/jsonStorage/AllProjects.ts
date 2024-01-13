import { JsonHandler } from "./jsonHandlerModel";

export type Project = {
    id: string;
    name: string;
    path: string;
    lastEditingDate: number;
};

export type AllProjectsJson = Array<Project>;

const defaulData: AllProjectsJson = [];

export class RecentProjectHandler extends JsonHandler<AllProjectsJson> {
    constructor(dataDir: string) {
        super(dataDir, "all-projects.json", defaulData);
    }
}
