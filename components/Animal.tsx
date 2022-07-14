import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Animal(props: { animal: any; img: any }) {
  const { animal, img } = props;

  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.image} />
      <Text style={styles.animalTitle}>{animal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  animalTitle: {
    fontSize: 18,
    color: '#000',
    marginTop: 12
  },
  container: {
    display: 'flex',
    alignContent: 'center',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }
});
