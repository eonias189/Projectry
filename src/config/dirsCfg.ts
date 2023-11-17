import { join, dirname } from "node:path";

export interface DirsCfgInterface {
    rootDir: string;
    frontendDir: string;
    preloadURL: string;
    dataDir: string;
}

const rootDir = dirname(dirname(__dirname)); //dirsCfg.js is in root/dist/data
const frontendDir = join(rootDir, "frontend");
const preloadURL = join(rootDir, "dist", "preload.js");

const appDataDir = process.env.AppData as string;
const dataDir = join(appDataDir, "projectry", "data");

const dirsCfg: DirsCfgInterface = {
    rootDir,
    frontendDir,
    preloadURL,
    dataDir,
};
export { dirsCfg };
