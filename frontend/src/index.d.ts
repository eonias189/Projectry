type Project = {
    path: string;
    alive: boolean;
};

type RecentProjectsJson = Array<Project>;

declare const api: () => {
    newProject: (path: string, alive: boolean) => Promise<Project>;
    getProjects: () => Promise<RecentProjectsJson>;
    addProject: (project: Project) => Promise<void>;
    removeProject: (path: string) => Promise<void>;
};
