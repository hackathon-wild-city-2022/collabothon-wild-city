import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function AnimalDetailsText(props: { extinctionRisk: string }) {
  const { extinctionRisk } = props;
  return <Text style={styles.animalDetail}>{extinctionRisk}</Text>;
}

const styles = StyleSheet.create({
  animalDetail: {
    height: 50,
    color: '#fff',
    backgroundColor: '#24A993',
    width: '90%',
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 50,
    marginTop: 20,
    alignSelf: 'center'
  }
});
