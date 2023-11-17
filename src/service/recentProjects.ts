import { JsonHandler } from "./jsonHandlerModel";

export type Project = {
    path: string;
    alive: boolean;
};

export type RecentProjectsJson = Array<Project>;

const defaulData: RecentProjectsJson = [];

export class RecentProjectHandler extends JsonHandler<RecentProjectsJson> {
    public fileName = "recent-projects.json";

    constructor(dataDir: string) {
        super(dataDir, defaulData);
    }
}
