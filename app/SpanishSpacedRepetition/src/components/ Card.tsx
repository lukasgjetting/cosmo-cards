import React, { useLayoutEffect, useRef } from 'react';
import {
	StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View,
} from 'react-native';
import FlipCard from 'react-native-card-flip';

interface CardProps {
	showAnswer: boolean;
	word: string;
	translation: string;
	onPress: TouchableOpacityProps['onPress'];
}

const Card: React.FC<CardProps> = ({
	showAnswer,
	word,
	translation,
	onPress,
}) => {
	const showingAnswer = useRef(false);
	const cardRef = useRef<FlipCard>();

	useLayoutEffect(() => {
		if (cardRef.current) {
			if (showAnswer !== showingAnswer.current) {
				showingAnswer.current = showAnswer;
				cardRef.current.flip();
			}
		}
	}, [showAnswer]);
	return (
		<FlipCard
			ref={(card) => {
				cardRef.current = card || undefined;
			}}
			style={styles.container}
			flipDirection="x"
		>
			<TouchableOpacity
				style={[styles.sideContainer, styles.front]}
				onPress={onPress}
				activeOpacity={0.75}
			>
				<Text style={styles.word}>{word}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.sideContainer, styles.back]}
				onPress={onPress}
				activeOpacity={0.75}
			>
				<Text style={styles.word}>{word}</Text>
				<View style={styles.separator} />
				<Text style={[styles.word, styles.translation]}>{translation}</Text>
			</TouchableOpacity>
		</FlipCard>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
	},
	sideContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 6,
		shadowRadius: 1,
		shadowOpacity: 0.1,
		shadowColor: '#000',
		elevation: 2,
	},
	front: {
		backgroundColor: 'white',
	},
	back: {
		backgroundColor: '#52c41a',
	},
	word: {
		fontSize: 32,
		paddingVertical: 32,
	},
	translation: {
		fontWeight: 'bold',
	},
	separator: {
		width: '80%',
		height: 1,
		backgroundColor: '#5b8c00',
	},
});

export default Card;
