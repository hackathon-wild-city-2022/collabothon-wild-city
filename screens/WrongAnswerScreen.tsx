import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WrongAnswerScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Try Again!</Text>
      <Text style={styles.paragraph}>Your answer is incorrect, but don't worry!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: '100%'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 33,
    marginTop: 33
  },
  paragraph: {
    fontSize: 21,
    color: '#000'
  }
});
