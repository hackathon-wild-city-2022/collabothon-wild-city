import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ResultScreen() {

let score = 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{score > 0 ? 'CONGRATS!' : 'OOPS!'}</Text>
      <Text style={styles.paragraph}>{score > 0 ? 'You have collected a HUMAN!' : 'Your answer is incorrect!'}</Text>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>{score > 0 ? 'Details' : 'Try Again!'}</Text>
        </TouchableOpacity>
    </View>
  )
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
  }
});
