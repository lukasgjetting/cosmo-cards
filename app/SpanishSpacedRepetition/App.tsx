import React, { useState } from 'react';
import {
	Dimensions,
	SafeAreaView, StyleSheet, View,
} from 'react-native';
import Card from './src/components/ Card';

const screenDimensions = Dimensions.get('window');

const cardWidth = screenDimensions.width * 0.80;
const cardHeight = Math.min(screenDimensions.height * 0.80, cardWidth * 1.50);

const App = () => {
	const [showAnswer, setShowAnswer] = useState(false);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.cardWrapper}>
				<Card
					showAnswer={showAnswer}
					word="Querer"
					translation="To want"
					onPress={() => setShowAnswer(!showAnswer)}
					onDismiss={() => null}
				/>
				<Card
					showAnswer={showAnswer}
					word="Tener"
					translation="To have"
					onPress={() => setShowAnswer(!showAnswer)}
					onDismiss={() => null}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1890ff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardWrapper: {
		width: cardWidth,
		height: cardHeight,
	},
});

export default App;
