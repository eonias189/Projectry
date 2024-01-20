export type TModule = {
    moduleID: string;
    name: string;
    objectsID: string[];
    functionsID: string[];
    depencies: Depency[];
    extraArgs?: ExtraArgs;
};

export type Depency = {
    moduleID: string;
    objectsID: string[];
    functionsID: string[];
};

export type TObject = {
    objectID: string;
    name: string;
    description?: string;
    fields: TypedValue[];
    methodsID: string[];
    extraArgs?: ExtraArgs;
};

export type TFunction = {
    functionID: string;
    name: string;
    description?: string;
    parameters: TypedValue[];
    returnType?: string;
    extraArgs?: ExtraArgs;
};

type ExtraArgs = Record<string, string>;

export type TypedValue = {
    name: string;
    typeHint?: string;
};
