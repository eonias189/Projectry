export type ApiType = ReturnType<typeof api>;
export type Unpormise<T> = T extends Promise<infer R> ? Unpormise<R> : T;
export type Project = Unpormise<ReturnType<ApiType["newProject"]>>;
