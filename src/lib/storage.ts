import AsyncStorage from '@react-native-community/async-storage';
import { History, HistoryEntry } from '../types';
import words from '../utils/words.json';

type RawHistoryEntry = Omit<HistoryEntry, 'date'> & {
	date: string;
};

interface Store {
	activeWords: string[];
	history: RawHistoryEntry[];
}

const getValue = async <T extends keyof Store>(
	key: T,
	defaultValue: Store[T],
): Promise<Store[T]> => JSON.parse(await AsyncStorage.getItem(key) || 'null') || defaultValue;

const setValue = <T extends keyof Store>(
	key: T,
	value: Store[T],
) => AsyncStorage.setItem(key, JSON.stringify(value));

export const getActiveWords = (): Promise<Store['activeWords']> => getValue('activeWords', []);
export const getHistory = async (): Promise<History> => {
	const rawHistory = await getValue('history', []);

	return rawHistory.map((e) => ({
		...e,
		date: new Date(e.date),
	}));
};

export const addHistoryEntry = async (entry: HistoryEntry): Promise<void> => {
	const currentHistory = await getHistory();

	await setValue('history', [...currentHistory, entry].map((e) => ({
		...e,
		date: e.date.toString(),
	})));
};

export const addRandomWord = async () => {
	const currentWords = await getActiveWords();

	const wordKeys = words
		.map((w) => w.word)
		.filter((w) => !currentWords.includes(w));

	if (wordKeys.length === 0) {
		return;
	}

	const index = Math.floor(Math.random() * wordKeys.length);

	const newWords = [...currentWords, wordKeys[index]];

	await setValue('activeWords', newWords);
};

export const removeWord = async (word: string) => {
	const currentWords = await getActiveWords();

	const newWords = currentWords.filter((w) => w !== word);

	await setValue('activeWords', newWords);
};
