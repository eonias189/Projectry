export const getEntries = <T>(obj: T): (Extract<keyof T, string> | T[Extract<keyof T, string>])[][] => {
    let res = [];
    for (let key in obj) {
        res.push([key, obj[key]]);
    }
    return res;
};
