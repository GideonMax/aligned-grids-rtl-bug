import { ColDef } from "@ag-grid-community/core";
import { faker } from "@faker-js/faker";

export const tableCount = 4;
export const data = Array.from({ length: tableCount }, () => Array.from({ length: (Math.random() * 20) << 0 }, () => ({
    title: faker.lorem.word(),
    bool: faker.datatype.boolean(),
    option: faker.helpers.arrayElement(["a", "b", "c"])
})));
export const columnDefs: ColDef[] = [
    {
        field: "title"
    },
    {
        field: "bool"
    },
    {
        field: "option"
    }
];