import fs from "fs";
import { join } from "node:path";

export interface JsonHandlerInterface<JsonModel, NewEntityFunc> {
    fileName?: string;
    getData(): JsonModel;
    setData(data: JsonModel): void;
    newEntity?: NewEntityFunc;
}

export class JsonHandler<JsonModel, NewEntityFunc>
    implements JsonHandlerInterface<JsonModel, NewEntityFunc>
{
    public fileName?: string;
    public newEntity?: NewEntityFunc;
    private dataDir: string;

    constructor(dataDir: string) {
        this.dataDir = dataDir;
    }

    private getFullPath(): string {
        if (this.fileName == undefined) {
            throw new Error("filename not defined");
        }
        return join(this.dataDir, this.fileName);
    }

    public getData(): JsonModel {
        let fullPath = this.getFullPath();
        let dataString = fs.readFileSync(fullPath, "utf-8");
        let dataJson = JSON.parse(dataString) as JsonModel;
        return dataJson;
    }

    public setData(data: JsonModel) {
        let fullPath = this.getFullPath();
        let dataString = JSON.stringify(data, null, 2);
        fs.writeFileSync(fullPath, dataString);
    }
}
