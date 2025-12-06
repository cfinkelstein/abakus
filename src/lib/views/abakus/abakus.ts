type AbakusRowItem = {
	id: string;
	nr: number;
	value: number;
	selected: boolean;
	parentName: string;
	hint: boolean;
	callback: () => void;
};

type AbakusRow = {
	name: string;
	shortName: string;
	index: number;
	items: AbakusRowItem[];
};

type AbakusTask = {
	terms: number[];
	actual: number;
	expected: number;
};

type AbakusData = {
	title: string;
	task: AbakusTask;
	rows: AbakusRow[];
};

export type { AbakusData, AbakusRow, AbakusRowItem, AbakusTask };





