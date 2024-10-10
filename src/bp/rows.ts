import { Row, NumberCell } from "@silevis/reactgrid";
import { RowCells } from '../BP';
import { HorizontalChevronCell } from '../cellTemplates/horizontalChevronCellTemplate/HorizontalChevronCellTemplate';
import { NonEditableNumberCell } from './CellTemplates';
import { startYear, endYear } from './columns';
const generateMonthHeader = (year: number, quarter: string, month: number): HorizontalChevronCell => {
    const formattedMonth = `${month}`.padStart(2, '0');
    return { type: 'horizontalChevron', text: `${formattedMonth}`, className: 'month header', parentId: `${year}-${quarter}` };
}

const generateQuarterHeader = (year: number, quarter: string, hasChildren: boolean = true, isExpanded: boolean = true): HorizontalChevronCell => {
    return { type: 'horizontalChevron', text: quarter, className: 'quarter header', parentId: `${year}`, hasChildren, isExpanded: true };
}

const generateQuarter = (year: number, quarter: string, month: number, isExpanded: boolean = true) => {
    return [
        generateQuarterHeader(year, quarter, isExpanded),
        generateMonthHeader(year, quarter, month),
        generateMonthHeader(year, quarter, month + 1),
        generateMonthHeader(year, quarter, month + 2),
    ]
}

const generateYear = (year: number, hasChildren: boolean = true, isExpanded: boolean = true): RowCells[] => {
    return [
        { type: 'horizontalChevron', text: `${year}`, className: 'year header', parentId: undefined, hasChildren, isExpanded },
        ...generateQuarter(year, 'Q1', 1),
        ...generateQuarter(year, 'Q2', 4),
        ...generateQuarter(year, 'Q3', 7),
        ...generateQuarter(year, 'Q4', 10),
    ];
}

const generateYearsBetween = (start: number, end: number) => {
    const years = [];
    for (let year = start; year <= end; year++) {
        years.push(...generateYear(year));
    }
    return years;
}

export const topHeaderRow: Row<RowCells> = {
    rowId: 'topHeader',
    cells: [
        { type: 'text', text: 'Organization / Period' },
        ...generateYearsBetween(startYear, endYear),
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
    const cells: RowCells[] = [];
    for (let year = startYear; year <= endYear; year++) {
        cells.push(generateNonEditableNumberCell(0, 'year'));
        for (let quarter = 1; quarter <= 4; quarter++) {
            cells.push(generateNonEditableNumberCell(0, 'quarter'));
            for (let month = 1; month <= 3; month++) {
                cells.push(generateNonEditableNumberCell(0, 'month'));
            }
        }
    }
    return cells;
};

export const generateFilledYear = (min: number = 0, max: number = 10000, bonus: number = 0): RowCells[] => {
    const cells: RowCells[] = [];
    for (let year = startYear; year <= endYear; year++) {
        cells.push(generateNonEditableNumberCell(0, 'year'));
        for (let quarter = 1; quarter <= 4; quarter++) {
            cells.push(generateNumberCell(0, 'quarter editable'));
            for (let month = 1; month <= 3; month++) {
                cells.push(generateNumberCell(getRandomInt(min, max) + bonus * (quarter - 1), 'month editable'));
            }
        }
    }
    return cells;
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