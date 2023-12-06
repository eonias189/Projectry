import fs from "fs";
import { join } from "node:path";

export interface ConnectionInterface<JsonModel extends Object> {
    data: JsonModel;
    save(): void;
}

export interface JsonHandlerInterface<JsonModel extends Object> {
    fileName?: string;
    getConnection(): ConnectionInterface<JsonModel>;
    getData(): JsonModel;
    setData(data: JsonModel): void;
}

export class Connection<JsonModel extends Object>
    implements ConnectionInterface<JsonModel>
{
    public data: JsonModel;
    private jsonHandler: JsonHandlerInterface<JsonModel>;

    constructor(data: JsonModel, jsonHandler: JsonHandlerInterface<JsonModel>) {
        this.data = data;
        this.jsonHandler = jsonHandler;
    }

    public save() {
        this.jsonHandler.setData(this.data);
    }
}

export class JsonHandler<JsonModel extends Object>
    implements JsonHandlerInterface<JsonModel>
{
    public fileName?: string;
    private dataDir: string;
    private defaultData: JsonModel;

    constructor(dataDir: string, defaultData: JsonModel) {
        this.dataDir = dataDir;
        this.defaultData = defaultData;
    }

    private getFullPath(): string {
        if (this.fileName == undefined) {
            throw new Error("filename not defined");
        }
        return join(this.dataDir, this.fileName);
    }

    public getConnection(): ConnectionInterface<JsonModel> {
        return new Connection(this.getData(), this);
    }

    public getData(): JsonModel {
        let fullPath = this.getFullPath();
        if (!fs.existsSync(fullPath)) {
            fs.mkdir(this.dataDir, console.log);
            this.setData(this.defaultData);
            return this.defaultData;
        }
        let dataString = fs.readFileSync(fullPath, "utf-8");
        let dataJson = JSON.parse(dataString) as JsonModel;
        return dataJson;
    }

    public setData(data: JsonModel) {
        let fullPath = this.getFullPath();
        let dataString = JSON.stringify(data, null, 2);
        fs.writeFileSync(fullPath, dataString, "utf-8");
    }
}
