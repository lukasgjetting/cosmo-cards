import React, { useEffect, useState } from 'react';
import {
	FlatList, StyleSheet, View,
} from 'react-native';
import { getHistory } from '../lib/storage';
import { History } from '../types';
import formatDate from '../utils/formatDate';
import Text from './Text';

const HistoryList = () => {
	const [history, setHistory] = useState<History>([]);

	useEffect(() => {
		(async () => {
			setHistory(await getHistory());
		})();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={history}
				keyExtractor={(i) => `${i.date.toISOString()}-${i.word}`}
				renderItem={({ item }) => (
					<Text>
						{`[${formatDate(item.date)}] ${item.word}: ${item.result}`}
					</Text>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 100,
		paddingHorizontal: 16,
		backgroundColor: 'white',
	},
});

export default HistoryList;
