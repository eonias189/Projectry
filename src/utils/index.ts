export const getEntries = <T>(obj: T): (Extract<keyof T, string> | T[Extract<keyof T, string>])[][] => {
    let res = [];
    for (let key in obj) {
        res.push([key, obj[key]]);
    }
    return res;
};

export const getDate = (date: Date): string => {
    const now = new Date();
    const dayDelta = (now.getTime() - date.getTime()) / 1000 / 3600 / 24;
    if (dayDelta >= 365) {
        return `${Math.ceil(dayDelta / 365)} years ago`;
    } else if (dayDelta >= 30) {
        return `${Math.ceil(dayDelta / 30.5)} months ago`;
    } else if (now.getDate() !== date.getDate()) {
        return `${Math.ceil(dayDelta)} days ago`;
    } else {
        return "today";
    }
};

export type Unpormise<T> = T extends Promise<infer R> ? Unpormise<R> : T;
export type UnArray<T> = T extends Array<infer R> ? UnArray<R> : T;
