import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CurrentAnimalContext } from '../App';

export default function Animal(props: { animal: string; img: string; enabled: boolean, navigation: any }) {
  const { animal, img, enabled } = props;
  const { currentAnimal, setCurrentAnimal } = useContext(CurrentAnimalContext);
  const navigation = useNavigation();

  const openPopup = (animal) => {
    setCurrentAnimal(animal);
    navigation.navigate('AnimalDetails');
  };

  return (
    <TouchableOpacity onPress={() => openPopup(animal)}>
      <View style={styles.container}>
        <Image source={{ uri: img }} style={enabled ? styles.image : styles.imageEnabled} />
        <Text style={styles.animalTitle}>{animal.name}</Text>
      </View>
    </TouchableOpacity>
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
