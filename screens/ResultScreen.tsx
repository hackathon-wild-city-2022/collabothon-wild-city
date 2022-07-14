import React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { CorrectAnswerContext } from '../App';

export default function ResultScreen({ navigation }) {
  const answer: any = useContext(CorrectAnswerContext);
  const correctAnswerImage = require('../assets/images/correctAnswer.png');
  const wrongAnswerImage = require('../assets/images/wrongAnswer.png');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{answer.correctAnswer ? 'CONGRATS!' : 'OOPS!'}</Text>
      <Image
        style={styles.answerImageStyle}
        source={answer.correctAnswer ? correctAnswerImage : wrongAnswerImage}
      />
      <Text style={styles.paragraph}>
        {answer.correctAnswer ? 'You have collected a HUMAN!' : 'Your answer is incorrect!'}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          answer.correctAnswer
            ? navigation.navigate('AnimalDetails')
            : navigation.navigate('PlayQuiz')
        }>
        <Text style={styles.buttonText}>{answer.correctAnswer ? 'Details' : 'Try Again'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: '100%',
    padding: 10
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 33,
    marginTop: 33,
    color: '#24A993'
  },
  paragraph: {
    fontSize: 21
  },
  button: {
    backgroundColor: '#F67D71',
    height: 60,
    width: '90%',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 33,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex'
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 60
  },
  answerImageStyle: {
    width: 300,
    height: 300
  }
});
