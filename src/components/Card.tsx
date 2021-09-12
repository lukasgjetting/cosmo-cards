import React, {
	useEffect, useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import {
	Animated,
	Dimensions,
	PanResponder,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from 'react-native';
import FlipCard from 'react-native-card-flip';
import { Result } from '../types';

const {
	width: screenWidth,
	height: screenHeight,
} = Dimensions.get('window');

const cardWidth = screenWidth * 0.80;
const cardHeight = Math.min(screenHeight * 0.80, cardWidth * 1.50);

const minDismissDrag = screenWidth * 0.30;
const velocityWeight = 75;

const getRandomDirection = (): 'x' | 'y' => (Math.random() > 0.5 ? 'x' : 'y');

interface CardProps {
	showAnswer: boolean;
	word: string;
	interactive: boolean;
	translation: string;
	onPress: TouchableOpacityProps['onPress'];
	onDismiss: (result: Result) => void;
}

const Card: React.FC<CardProps> = ({
	showAnswer,
	word,
	translation,
	interactive,
	onPress,
	onDismiss,
}) => {
	const showingAnswer = useRef(false);
	const cardRef = useRef<FlipCard>();
	const pan = useRef(new Animated.ValueXY());
	const [flipDirection, setFlipDirection] = useState(getRandomDirection);

	useEffect(() => {
		setFlipDirection(getRandomDirection());
	}, [word]);

	const panResponder = useMemo(() => PanResponder.create({
		onStartShouldSetPanResponder: () => false,
		onMoveShouldSetPanResponder: (event, gestureState) => (
			gestureState.dx !== 0 ||
			gestureState.dy !== 0
		),
		onPanResponderMove: (event, gestureState) => {
			pan.current.setValue({
				x: gestureState.dx * 1.25,
				y: Math.abs(gestureState.dx) * -0.25,
			});
		},
		onPanResponderRelease: (_event, gestureState) => {
			let x = 0;
			const y = 0;
			let callback;

			const drag = Math.abs(gestureState.dx) + Math.abs(gestureState.vx) * velocityWeight;

			if (drag > minDismissDrag) {
				const result = gestureState.dx > 0 ? 'success' : 'failure';
				callback = () => onDismiss(result);
				x = 1.3 * (gestureState.dx > 0 ? screenWidth : -screenWidth);
			}

			Animated.spring(pan.current, {
				useNativeDriver: false,
				toValue: { x, y },
				velocity: { x: 3, y: 3 },
				overshootClamping: true,

			}).start(callback);
		},
	}), [onDismiss]);

	useEffect(() => {
		pan.current.setValue({ x: 0, y: screenHeight });

		Animated.spring(pan.current, {
			useNativeDriver: false,
			toValue: { x: 0, y: 0 },
		}).start();
	}, [word]);

	useLayoutEffect(() => {
		if (cardRef.current) {
			if (showAnswer !== showingAnswer.current) {
				showingAnswer.current = showAnswer;
				cardRef.current.flip();
			}
		}
	}, [showAnswer]);

	const rotation = pan.current.x.interpolate({
		inputRange: [-screenWidth / 2, 0, screenWidth / 2],
		outputRange: ['-10deg', '0deg', '10deg'],
	});

	return (
		<Animated.View
			{...(interactive ? panResponder.panHandlers : {})}
			style={[
				pan.current.getLayout(),
				{
					transform: [
						{ rotate: rotation },
						{ translateX: (screenWidth - cardWidth) / 2 },
						{ translateY: (screenHeight - cardHeight) / 3 },
					],
				},
				styles.container,
			]}
		>
			<Animated.Text
				style={[styles.resultWrapper, styles.resultSuccess, {
					opacity: pan.current.x.interpolate({
						inputRange: [0, screenWidth / 3],
						outputRange: [0, 0.85],
					}),
				}]}
			>
				Success
			</Animated.Text>
			<Animated.Text
				style={[styles.resultWrapper, styles.resultFailure, {
					opacity: pan.current.x.interpolate({
						inputRange: [-screenWidth / 3, 0],
						outputRange: [0.85, 0],
					}),
				}]}
			>
				Failure
			</Animated.Text>
			<FlipCard
				ref={(card) => {
					cardRef.current = card || undefined;
				}}
				style={styles.card}
				flipDirection={flipDirection}
			>
				<TouchableOpacity
					disabled={!interactive}
					style={styles.sideContainer}
					onPress={onPress}
					activeOpacity={1}
				>
					<Text style={styles.word}>{word}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					disabled={!interactive}
					style={styles.sideContainer}
					onPress={onPress}
					activeOpacity={1}
				>
					<Text style={styles.word}>{word}</Text>
					<View style={styles.separator} />
					<Text style={[styles.word, styles.translation]}>{translation}</Text>
				</TouchableOpacity>
			</FlipCard>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: cardWidth,
		height: cardHeight,
	},
	card: {
		flex: 1,
	},
	sideContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 6,
		shadowColor: '#002766',
		shadowRadius: 2,
		shadowOpacity: 0.5,
		shadowOffset: { width: 0, height: 1 },
		backgroundColor: '#531dab',
	},
	word: {
		fontSize: 32,
		paddingVertical: 32,
		color: 'white',
	},
	translation: {
		color: 'white',
		fontWeight: 'bold',
	},
	separator: {
		width: '80%',
		height: 1,
		backgroundColor: '#CCC',
	},
	resultWrapper: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		paddingVertical: 16,
		color: 'white',
		zIndex: 1,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		fontSize: 24,
		alignItems: 'center',
		justifyContent: 'center',
		textAlignVertical: 'center',
		textAlign: 'center',
	},
	resultSuccess: {
		backgroundColor: '#52c41a',
	},
	resultFailure: {
		backgroundColor: '#f5222d',
	},
});

export default Card;
