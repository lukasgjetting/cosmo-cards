export type Result = 'success' | 'failure';

export interface HistoryEntry {
	word: string;
	result: Result;
	date: Date;
}

export type History = HistoryEntry[];
