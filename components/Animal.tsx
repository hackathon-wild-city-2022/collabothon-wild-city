import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Animal(props: { animal: string; img: string; enabled: boolean }) {
  const { animal, img, enabled } = props;

  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={enabled ? styles.image : styles.imageEnabled} />
      <Text style={styles.animalTitle}>{animal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    opacity: 0.2,
  },
  imageEnabled: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  animalTitle: {
    fontSize: 14,
    color: '#000',
    marginTop: 12,
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    alignContent: 'stretch',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }
});
