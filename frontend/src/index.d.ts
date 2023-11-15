declare const api: {
    getMyFeature: (name: string) => Promise<string>;
    sumNums: (...nums: number[]) => Promise<number>;
};
