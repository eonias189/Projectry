import { JsonHandler } from "./jsonHandlerModel";

export type Project = {
    path: string;
    alive: boolean;
};

export type RecentProjectsJson = Array<Project>;

const defaulData: RecentProjectsJson = [];

export class RecentProjectHandler extends JsonHandler<RecentProjectsJson> {
    constructor(dataDir: string) {
        super(dataDir, "recent-projects.json", defaulData);
    }
}
