import { JsonHandler } from "./JsonHandlerInterface";
import fs from "fs";

export type Project = {
    path: string;
    alive: boolean;
};

export function newProject(path: string, alive: boolean): Project {
    return {
        path,
        alive,
    };
}

export type RecentProjectsJson = Array<Project>;

export class RecentProjectHandler extends JsonHandler<
    RecentProjectsJson,
    typeof newProject
> {
    public fileName = "recent-projects.json";
    public newEntity = newProject;
}
