declare const api: {
    getMyFeature: (name: string) => Promise<string>;
    getSumNums: (...nums: number[]) => Promise<number>;
};
