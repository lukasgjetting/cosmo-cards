import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Card from './src/components/ Card';

const App = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowAnswer(v => !v);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Card
          showAnswer={showAnswer}
          word="Querer"
          translation="To want"
          />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#69B',
  },
  innerContainer: {
    paddingHorizontal: 48,
    paddingVertical: 128,
  },
});

export default App;
