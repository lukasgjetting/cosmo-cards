import AsyncStorage from '@react-native-community/async-storage';

export interface Store {
	activeWords: string[];
	history: { string: number; }
}

const getValue = (
	key: keyof Store,
	defaultValue: any,
): any => AsyncStorage.getItem(key, defaultValue);

export const getActiveWords = (): Store['activeWords'] => getValue('activeWords', []);
export const history = (): Store['history'] => getValue('history', []);
