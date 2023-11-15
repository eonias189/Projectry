import { myFeature, getMyFeature } from "./myFeature";
import { sumNums, sumNumsHandler } from "./sumNums";

export const api = {
    getMyFeature,
    sumNums,
};

export const apiHandlers = [myFeature, sumNumsHandler];
