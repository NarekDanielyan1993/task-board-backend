export const isExist = (item: unknown): item is boolean =>
    item !== undefined && item !== null;
