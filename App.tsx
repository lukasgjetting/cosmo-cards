import React, {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	Button,
	SafeAreaView,
	StyleSheet,
	View,
	StatusBar,
} from 'react-native';
import Card from './src/components/Card';
import Icon from './src/components/Icon';
import Text from './src/components/Text';
import {
	addHistoryEntry,
	addRandomWord,
	getActiveWords,
} from './src/lib/storage';
import Theme from './src/lib/theme';
import { Result } from './src/types';
import words from './src/utils/words.json';

const App = () => {
	const [showAnswer, setShowWordAnswer] = useState(false);
	const [cards, setCards] = useState<string[]>([]);
	const [showCongratulations, setShowCongratulations] = useState(false);
	const [hasWrongAnswer, setHasWrongAnswer] = useState(false);

	const activeCard = useMemo(() => words.find((w) => w.word === cards[0]), [cards]);

	useEffect(() => {
		(async () => {
			let currentWords = await getActiveWords();

			if (currentWords.length === 0) {
				await addRandomWord();
				currentWords = await getActiveWords();
			}

			setCards(currentWords);
		})();
	}, []);

	const cardShown = () => {
		setShowCongratulations(cards.length === 1);
	};

	const dismiss = useCallback(async (result: Result) => {
		const { word } = activeCard!;

		if (result === 'failure') {
			setHasWrongAnswer(true);
		}

		setShowWordAnswer(false);

		await addHistoryEntry({
			date: new Date(),
			word,
			result,
		});

		setCards(cards.filter((c) => c !== word));
	}, [activeCard]);

	const restartRound = async () => {
		setCards(await getActiveWords());
	};

	const startNewRound = async () => {
		await addRandomWord();
		await restartRound();
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" />
			{showCongratulations && (
				<View style={styles.doneWrapper}>
					<Icon
						name={hasWrongAnswer ? 'ios-sad-outline' : 'ios-happy-outline'}
						size={72}
					/>
					<Text style={styles.doneText}>
						{hasWrongAnswer ? 'Oops!' : 'Good job!'}
					</Text>
					<Button
						title={hasWrongAnswer ? 'Try again' : 'Start new round'}
						onPress={hasWrongAnswer ? restartRound : startNewRound}
					/>
				</View>
			)}
			{cards.length > 0 && (
				<View style={styles.cardWrapper}>
					{activeCard != null && (
						<Card
							interactive
							word={activeCard.word}
							translation={activeCard.translation}
							onDismiss={dismiss}
							onCardShown={cardShown}
							onPress={() => setShowWordAnswer(!showAnswer)}
							showAnswer={showAnswer}
						/>
					)}
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.primary,
	},
	cardWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	doneWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		...StyleSheet.absoluteFillObject,
	},
	doneText: {
		fontSize: 36,
	},
});

export default App;
