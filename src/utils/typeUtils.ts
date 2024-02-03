export type Unpormise<T> = T extends Promise<infer R> ? Unpormise<R> : T;
export type UnArray<T> = T extends Array<infer R> ? UnArray<R> : T;
export type ObjectValues<T extends Object> = T extends Record<string, infer R> ? R : never;
export type CombineObjects<Obj1 extends Object, Obj2 extends Object> = {
    [x in keyof Obj1 | keyof Obj2]: x extends keyof Obj1 ? Obj1[x] : x extends keyof Obj2 ? Obj2[x] : never;
};
