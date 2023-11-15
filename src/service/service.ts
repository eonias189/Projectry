import { ConfigInterface, config } from "../config";
import { JsonHandler } from "./JsonHandlerInterface";
import {
    RecentProjectHandler,
    RecentProjectsJson,
    newProject,
} from "./recentProjectsHandler";

export class Service {
    public recentProjects: JsonHandler<RecentProjectsJson, typeof newProject>;
    private cfg: ConfigInterface;

    constructor(cfg: ConfigInterface) {
        this.cfg = cfg;
        this.recentProjects = new RecentProjectHandler(this.cfg.dataDir);
    }
}

const service = new Service(config);
export { service };
