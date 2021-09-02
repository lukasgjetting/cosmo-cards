import React, {useLayoutEffect, useRef} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import FlipCard from 'react-native-card-flip';

interface CardProps {
  showAnswer: boolean;
  word: string;
  translation: string;
}

const Card: React.FC<CardProps> = ({
    showAnswer,
    word,
    translation,
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
      ref={card => {
        cardRef.current = card || undefined;
      }}
      style={styles.container}
      flipDirection="x"
    >
      <View style={[styles.sideContainer, styles.front]}>
        <Text style={styles.word}>{word}</Text>
      </View>
      <View style={[styles.sideContainer,styles.back]}>
        <Text style={styles.word}>{word}</Text>
        <View style={styles.separator} />
        <Text style={[styles.word, styles.translation]}>{translation}</Text>
      </View>
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
    borderRadius: 48,
    shadowRadius: 2,
    shadowOpacity: 0.3,
},
front: {
    backgroundColor: 'blue',
    shadowColor: '#CCC',
},
back: {
    shadowColor: '#CCC',
      backgroundColor: 'white',
  },
  word: {
    fontSize: 16,
    paddingVertical: 32,
  },
  translation: {
    fontWeight: 'bold',
  },
  separator: {
    width: '80%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#AAAA',
  },
});

export default Card;
