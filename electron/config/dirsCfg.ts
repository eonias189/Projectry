import { join, dirname } from "node:path";

export interface DirsCfgInterface {
    rootDir: string;
    publicDir: string;
    preloadURL: string;
    dataDir: string;
    buildDir: string;
}

const rootDir = dirname(dirname(dirname(__dirname))); //dirsCfg.js is in root/build/electron/config
const buildDir = join(rootDir, "build");
const publicDir = join(rootDir, "public");
const preloadURL = join(buildDir, "electron", "preload.js");

const appDataDir = process.env.AppData as string;
const dataDir = join(appDataDir, "projectry", "data");

const dirsCfg: DirsCfgInterface = {
    rootDir,
    publicDir,
    buildDir,
    preloadURL,
    dataDir,
};
export { dirsCfg };
