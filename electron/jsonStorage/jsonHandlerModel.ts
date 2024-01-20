import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

export interface ConnectionInterface<JsonModel extends Object> {
    data: JsonModel;
    save(): Promise<void>;
}

export interface JsonHandlerInterface<JsonModel extends Object> {
    fileName?: string;
    getConnection(): Promise<ConnectionInterface<JsonModel>>;
    getData(): Promise<JsonModel>;
    setData(data: JsonModel): Promise<void>;
}

export class Connection<JsonModel extends Object> implements ConnectionInterface<JsonModel> {
    public data: JsonModel;
    private jsonHandler: JsonHandlerInterface<JsonModel>;

    constructor(data: JsonModel, jsonHandler: JsonHandlerInterface<JsonModel>) {
        this.data = data;
        this.jsonHandler = jsonHandler;
    }

    public async save(): Promise<void> {
        await this.jsonHandler.setData(this.data);
    }
}

export class JsonHandler<JsonModel extends Object> implements JsonHandlerInterface<JsonModel> {
    private defaultData: JsonModel;
    private fullPath: string;
    private connection?: ConnectionInterface<JsonModel>;

    constructor(fullpath: string, defaultData: JsonModel) {
        this.fullPath = fullpath;
        this.defaultData = defaultData;
        this.checkFileExists();
    }

    public async getConnection(): Promise<ConnectionInterface<JsonModel>> {
        if (!this.connection) {
            this.connection = new Connection(await this.getData(), this);
        }
        return this.connection;
    }

    private checkFileExists() {
        const parentDir = dirname(this.fullPath);
        if (!existsSync(parentDir)) {
            mkdirSync(parentDir);
        }
        if (!existsSync(this.fullPath)) {
            writeFileSync(this.fullPath, JSON.stringify(this.defaultData, null, 2));
        }
    }

    public async getData(): Promise<JsonModel> {
        let dataString = await readFile(this.fullPath, "utf-8");
        let dataJson = JSON.parse(dataString) as JsonModel;
        return dataJson;
    }

    public async setData(data: JsonModel) {
        let dataString = JSON.stringify(data, null, 2);
        return await writeFile(this.fullPath, dataString);
    }
}
