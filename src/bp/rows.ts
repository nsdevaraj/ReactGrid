import { Row, NumberCell } from "@silevis/reactgrid";
import { RowCells } from '../BP';
import { HorizontalChevronCell } from '../cellTemplates/horizontalChevronCellTemplate/HorizontalChevronCellTemplate';
import { NonEditableNumberCell } from './CellTemplates';
import { startDate, endDate } from './columns';

const generateMonthHeader = (date: Date): HorizontalChevronCell => {
    const year = date.getFullYear();
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    const month = date.getMonth() + 1;
    const formattedMonth = `${month}`.padStart(2, '0');
    return { type: 'horizontalChevron', text: `${formattedMonth}`, className: 'month header', parentId: `${year}-Q${quarter}` };
}

const generateQuarterHeader = (date: Date, hasChildren: boolean = true, isExpanded: boolean = true): HorizontalChevronCell => {
    const year = date.getFullYear();
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    return { type: 'horizontalChevron', text: `Q${quarter}`, className: 'quarter header', parentId: `${year}`, hasChildren, isExpanded };
}

const generateYearHeader = (date: Date, hasChildren: boolean = true, isExpanded: boolean = true): HorizontalChevronCell => {
    const year = date.getFullYear();
    return { type: 'horizontalChevron', text: `${year}`, className: 'year header', parentId: undefined, hasChildren, isExpanded };
}

const generateDateRange = (start: Date, end: Date) => {
    const cells = [];
    let currentDate = new Date(start);
    currentDate.setDate(1); // Start from the first day of the month

    while (currentDate <= end) {
        if (currentDate.getMonth() === 0 || currentDate.getTime() === start.getTime()) {
            cells.push(generateYearHeader(currentDate));
        }
        if (currentDate.getMonth() % 3 === 0 || currentDate.getTime() === start.getTime()) {
            cells.push(generateQuarterHeader(currentDate));
        }
        cells.push(generateMonthHeader(currentDate));

        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return cells;
}

export const topHeaderRow: Row<RowCells> = {
    rowId: 'topHeader',
    cells: [
        { type: 'text', text: 'Organization / Period' },
        ...generateDateRange(startDate, endDate),
    ]
};

const myNumberFormat = new Intl.NumberFormat('us', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

const generateNumberCell = (value: number, className: string = '', nanToZero: boolean = true): NumberCell => {
    return { type: 'number', value, className, nanToZero, format: myNumberFormat };
}

const generateNonEditableNumberCell = (value: number, className: string = '', nanToZero: boolean = true): NonEditableNumberCell => {
    return { type: 'nonEditableNumber', value, className, nanToZero, format: myNumberFormat };
}

export const generateEmptyYear = (): RowCells[] => {
    return generateDateRange(startDate, endDate).map(() => generateNonEditableNumberCell(0, 'empty'));
};

export const generateFilledYear = (min: number = 0, max: number = 10000, bonus: number = 0): RowCells[] => {
    return generateDateRange(startDate, endDate).map((cell, index) => {
        if (cell.type === 'horizontalChevron') {
            return generateNonEditableNumberCell(0, cell.className || '');
        } else {
            return generateNumberCell(getRandomInt(min, max) + bonus * Math.floor(index / 3), 'editable');
        }
    });
};

const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const dataRows: Row<RowCells>[] = [
    {
        rowId: 'Silevis',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Silevis organization', parentId: undefined, isExpanded: true },
            ...generateEmptyYear(),
        ]
    },
    {
        rowId: 'Expenses',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Expenses', parentId: 'Silevis', isExpanded: true },
            ...generateEmptyYear(),
        ]
    },
    {
        rowId: 'Fixed',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Fixed', parentId: 'Expenses', isExpanded: true },
            ...generateEmptyYear(),
        ]
    },
    {
        rowId: 'Salaries',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Salaries', parentId: 'Fixed', isExpanded: true },
            ...generateEmptyYear(),
        ]
    },
    {
        rowId: 'Serge Gainsbourg',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Serge Gainsbourg', parentId: 'Salaries', isExpanded: true },
            ...generateFilledYear(5500, 2352, 300.32),
        ]
    },
    {
        rowId: 'Jacob Sandberg',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Jacob Sandberg', parentId: 'Salaries' },
            ...generateFilledYear(4500, 3253, 100),
        ]
    },
    {
        rowId: 'Elizabeth Hudson',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Elizabeth Hudson', parentId: 'Salaries' },
            ...generateFilledYear(6000, 2352, 50.12),
        ]
    },
    {
        rowId: 'Office costs',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Office costs', parentId: 'Fixed', isExpanded: true },
            ...generateFilledYear(1000, 532, 10.12),
        ]
    },
    {
        rowId: 'Gas',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Gas', parentId: 'Office costs' },
            ...generateFilledYear(599, 232, 10.12),
        ]
    },
    {
        rowId: 'Electricity',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Electricity', parentId: 'Office costs' },
            ...generateFilledYear(589, 435, 10.12),
        ]
    },
    {
        rowId: 'Rent',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Rent', parentId: 'Office costs' },
            ...generateFilledYear(343, 235, 10.12),
        ]
    },
    {
        rowId: 'Insurance',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Insurance', parentId: 'Fixed', isExpanded: true },
            ...generateFilledYear(235, 835, 10.12),
        ]
    },
    {
        rowId: 'One-time',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'One-time', parentId: 'Expenses', isExpanded: true },
            ...generateFilledYear(435, 235, 10.12),
        ]
    },
    {
        rowId: 'Vehicle',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Vehicle', parentId: 'One-time' },
            ...generateFilledYear(958, 231, 10.12),
        ]
    },
    {
        rowId: 'Computer',
        reorderable: true,
        cells: [
            { type: 'chevron', text: 'Computer', parentId: 'One-time' },
            ...generateFilledYear(435, 769, 10.12),
        ]
    },
];