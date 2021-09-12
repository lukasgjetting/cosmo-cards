import React, {
	useCallback, useEffect, useMemo, useState,
} from 'react';
import {
	Button,
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
} from 'react-native';
import Card from './src/components/Card';
import {
	addHistoryEntry,
	addRandomWord,
	getActiveWords,
	removeWord,
} from './src/lib/storage';
import { Result } from './src/types';
import words from './src/utils/words.json';

const App = () => {
	const [showAnswer, setShowWordAnswer] = useState(false);
	const [cards, setCards] = useState<string[]>([]);

	const activeCard = useMemo(() => words.find((w) => w.word === cards[0]), [cards]);

	useEffect(() => {
		updateCards();
	}, []);

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
			<StatusBar barStyle="light-content" />
			<Button
				onPress={addCard}
				title="Add word"
				color="white"
			/>
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
		backgroundColor: '#120338',
	},
	cardWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default App;
