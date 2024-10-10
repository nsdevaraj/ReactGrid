import { Column } from "@silevis/reactgrid";

export type BPColumn = Column;

export const startDate = new Date('2023-03-01');
export const endDate = new Date('2024-09-30');

const getMonth = (date: Date) => {
    const year = date.getFullYear();
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    const month = date.getMonth() + 1;
    const formattedMonth = `${month}`.padStart(2, '0');
    return { columnId: `${year}-Q${quarter}-${formattedMonth}`, width: 100 };
}

const getQuarter = (date: Date) => {
    const year = date.getFullYear();
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    return { columnId: `${year}-Q${quarter}`, width: 100 };
}

const getYear = (date: Date) => {
    const year = date.getFullYear();
    return { columnId: `${year}`, width: 100 };
}

const generateDateRange = (start: Date, end: Date) => {
    const columns = [];
    let currentDate = new Date(start);
    currentDate.setDate(1); // Start from the first day of the month

    while (currentDate <= end) {
        if (currentDate.getMonth() === 0 || currentDate.getTime() === start.getTime()) {
            columns.push(getYear(currentDate));
        }
        if (currentDate.getMonth() % 3 === 0 || currentDate.getTime() === start.getTime()) {
            columns.push(getQuarter(currentDate));
        }
        columns.push(getMonth(currentDate));

        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return columns;
}

export const dataColumns: BPColumn[] = [
    { columnId: 'Struct', width: 250 },
    ...generateDateRange(startDate, endDate),
];