import { ProjectData } from ".";
import { UnArray } from "../utils/typeUtils";

interface IAddElement<K extends keyof ProjectData> {
    key: K;
    element: UnArray<ProjectData[K]>;
}

export type AddElementPayload =
    | IAddElement<"modules">
    | IAddElement<"objects">
    | IAddElement<"functions">
    | IAddElement<"interfaces">;

export type ChildrenPayload = {
    id: string;
    childType: keyof UnArray<ProjectData["modules"]>["children"];
    child: string;
};

type IEdit<K extends keyof ProjectData> = {
    key: K;
    id: string;
    newElement: UnArray<ProjectData[K]>;
};

export type EditPayload = IEdit<"modules"> | IEdit<"objects"> | IEdit<"functions"> | IEdit<"interfaces">;
