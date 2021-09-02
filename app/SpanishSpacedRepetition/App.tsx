import arrayShuffle from 'array-shuffle';
import React, { useEffect, useMemo, useState } from 'react';
import {
	ActivityIndicator,
	Button,
	SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Card from './src/components/ Card';
import { addRandomWord, getActiveWords, removeWord } from './src/lib/storage';
import words from './src/utils/words.json';

const App = () => {
	const [showAnswer, setShowAnswer] = useState(false);
	const [cards, setCards] = useState<string[]>([]);

	useEffect(() => {
		updateCards();
	}, []);

	const updateCards = async () => {
		setCards(await getActiveWords());
	};

	const addCard = async () => {
		await addRandomWord();
		await updateCards();
	};

	const removeCard = async (word: string) => {
		await removeWord(word);
		await updateCards();
	};

	const cardObjects = useMemo(() => (
		cards.map((c) => words.find((w) => w.word === c)!)
	), [cards]);

	return (
		<SafeAreaView style={styles.container}>
			<Button onPress={addCard} title="Add word" color="white" />
			<View style={styles.cardWrapper}>
				{cardObjects.map((c, index) => (
					<Card
						key={c.word}
						interactive={index === 0}
						word={c.word}
						translation={c.translation}
						onDismiss={() => removeCard(c.word)}
						onPress={() => null}
						showAnswer={false}
					/>
				)).reverse()}
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
