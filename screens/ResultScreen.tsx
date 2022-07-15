import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { CorrectAnswerContext, CurrentAnimalContext } from '../App';

export default function ResultScreen() {
  const answer: any = useContext(CorrectAnswerContext);
  const correctAnswerImage = require('../assets/images/correctAnswer.png');
  const wrongAnswerImage = require('../assets/images/wrongAnswer.png');
  const navigation = useNavigation();
  const { currentAnimal } = useContext(CurrentAnimalContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{answer.correctAnswer ? 'Congratulations!' : 'Wrong answer!'}</Text>
      <Text style={styles.subtitle}>{answer.correctAnswer ? 'Add new animal to your collection :)' : 'Try again or quit :('}</Text>
      <Image
        style={styles.answerImageStyle}
        source={answer.correctAnswer ? correctAnswerImage : wrongAnswerImage}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          answer.correctAnswer
            ? navigation.navigate('AnimalDetails')
            : navigation.navigate('PlayQuiz')
        }>
        <Text style={styles.buttonText}>{answer.correctAnswer ? 'Add to collection' : 'Try Again'}</Text>
      </TouchableOpacity>
      {
        !answer.correctAnswer
          ? <TouchableOpacity
            style={styles.buttonQuit}
            onPress={() =>
              navigation.navigate('Camera')
            }>
            <Text style={styles.buttonQuitText}>Quit</Text>
          </TouchableOpacity>
          : <></>}
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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 33,
    marginTop: 33,
    color: '#24A993'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 33,
    color: '#24A993'
  },
  paragraph: {
    fontSize: 21
  },
  button: {
    backgroundColor: '#0E443B',
    height: 60,
    width: '90%',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 60
  },
  buttonQuit: {
    backgroundColor: '#ffffff',
    height: 60,
    width: '90%',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 33,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    borderWidth: 1,
    borderColor: '#9C9D9E',
  },
  buttonQuitText: {
    color: '#9C9D9E',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 60
  },
  answerImageStyle: {
    width: 300,
    height: 300
  }
});
