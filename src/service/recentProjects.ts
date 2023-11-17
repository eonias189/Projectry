import { JsonHandler } from "./jsonHandlerModel";
import fs from "fs";

export type Project = {
    path: string;
    alive: boolean;
};

export type RecentProjectsJson = Array<Project>;

export class RecentProjectHandler extends JsonHandler<RecentProjectsJson> {
    public fileName = "recent-projects.json";
}
