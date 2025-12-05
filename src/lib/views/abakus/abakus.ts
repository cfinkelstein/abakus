
type AbakusRowItem = {
    id: string;
    nr: number;
    value: number;
    selected: boolean;
    parentName: string;
    hint: boolean
    callback: () => void;
};

type AbakusRow = {
    name: string;
    shortName: string;
    index: number;
    items: AbakusRowItem[];
};

type AbakusValue = {
    value: number;
};

type AbakusTask = {
    terms: number[];
    actual: number;
    expected: number;
};

type AbakusResult = {
    expected: number;
    actual: number;
};

type AbakusData = {
    title: string;
    currentValue: AbakusValue;
    task: AbakusTask;
    result: AbakusResult;
    rows: AbakusRow[];
};


export type {
    AbakusData,
    AbakusRow,
    AbakusRowItem,
    AbakusValue,
    AbakusTask,
    AbakusResult
};





