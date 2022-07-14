import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function AnimalDetailsTextSmall(props: { text: string }) {
  const { text } = props;

  return <Text style={styles.animalDetail}>{text}</Text>;
}

const styles = StyleSheet.create({
  animalDetail: {
    height: 46,
    color: '#fff',
    backgroundColor: '#1D8776',
    width: 107,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 46,
    marginTop: 20,
    alignSelf: 'center'
  }
});
