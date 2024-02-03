export type TModule = ElementMixin & {
    children: ModuleChildren;
    depencies: ModuleChildren;
};

type ModuleChildren = {
    objects: string[];
    functions: string[];
    interfaces: string[];
};

export type ElementMixin = {
    id: string;
    name: string;
    description?: string;
    extraArgs?: ExtraArgs;
};

export type TObject = ElementMixin & {
    methods: FunctionSignature[];
    fields: TypedValue[];
};

export type TFunction = ElementMixin & {
    signature: FunctionSignature;
};

export type FunctionSignature = {
    name: string;
    parameters: TypedValue[];
    returnType?: string;
};

export type TInterface = ElementMixin & {
    fields: TypedValue[];
    methods: FunctionSignature[];
};

export type ExtraArgs = Record<string, string>;

export type TypedValue = {
    name: string;
    typeHint?: string;
};
