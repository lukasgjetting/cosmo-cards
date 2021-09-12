import React, {
	useCallback, useEffect, useMemo, useState,
} from 'react';
import {
	Button,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Card from './src/components/Card';
import {
	addHistoryEntry, addRandomWord, getActiveWords, getHistory, removeWord,
} from './src/lib/storage';
import { History, Result } from './src/types';
import formatDate from './src/utils/formatDate';
import words from './src/utils/words.json';

const App = () => {
	const [showAnswer, setShowWordAnswer] = useState(false);
	const [cards, setCards] = useState<string[]>([]);
	const [history, setHistory] = useState<History>([]);

	const activeCard = useMemo(() => words.find((w) => w.word === cards[0]), [cards]);

	useEffect(() => {
		updateCards();
	}, []);

	useEffect(() => {
		(async () => {
			setHistory(await getHistory());
		})();
	}, [activeCard]);

	const updateCards = async () => {
		const newCards = await getActiveWords();
		setCards(newCards);
	};

	const addCard = async () => {
		setShowWordAnswer(false);
		await addRandomWord();
		await updateCards();
	};

	const removeCard = useCallback(async (result: Result) => {
		const { word } = activeCard!;

		setShowWordAnswer(false);

		await addHistoryEntry({
			date: new Date(),
			word,
			result,
		});

		await removeWord(word);
		await updateCards();
	}, [activeCard]);

	return (
		<SafeAreaView style={styles.container}>
			<Button onPress={addCard} title="Add word" color="white" />
			<View>
				{history.map((e) => (
					<Text>
						{`[${formatDate(e.date)}] ${e.word}: ${e.result}`}
					</Text>
				))}
			</View>
			<View style={styles.cardWrapper}>
				{activeCard != null && (
					<Card
						interactive
						word={activeCard.word}
						translation={activeCard.translation}
						onDismiss={removeCard}
						onPress={() => setShowWordAnswer(!showAnswer)}
						showAnswer={showAnswer}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1890ff',
	},
	cardWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default App;
