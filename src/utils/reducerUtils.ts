export interface Unique {
    id: string;
}

export const addUniqueElement = <T extends Unique>(arr: T[], element: T): T[] => {
    if (arr.find((i) => i.id === element.id)) {
        return arr;
    }
    return [...arr, element];
};

export const deleteUniqueElement = <T extends Unique>(arr: T[], id: string): T[] => {
    return arr.filter((i) => i.id !== id);
};

export const editUniqueElement = <T extends Unique>(arr: T[], id: string, newElement: T): void => {
    const index = arr.findIndex((i) => i.id === id);
    if (index === -1) {
        return;
    }
    arr[index] = newElement;
};
