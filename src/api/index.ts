import { myFeature, getMyFeature } from "./myFeature";
import { sumNums, getSumNums } from "./sumNums";

export const api = {
    getMyFeature,
    getSumNums,
};

export const apiHandlers = [myFeature, sumNums];
