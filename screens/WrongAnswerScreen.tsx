import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function WrongAnswerScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Try again!</Text>
      <Text style={styles.paragraph}>Your answer is incorrect!</Text>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Details</Text>
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
    color: '#F67D71'
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
