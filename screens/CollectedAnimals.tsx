import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CaughtAnimalsContext } from '../App';
import Animal from '../components/Animal';

export default function CollectedAnimals() {
  const { caughtAnimals } = useContext(CaughtAnimalsContext);
  const [flock, setFlock] = React.useState('');
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleFlockChange = (text: string) => {
    setFlock('');
    setFlock(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collected animals</Text>
      <TextInput
        style={styles.input}
        placeholder="Search animal by name"
        onChangeText={(text) => setSearchPhrase(text)}
      />
      <View style={styles.separator}>
        <Text style={styles.subtitle}>Category</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleFlockChange('All')}>
          <Text>View all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuWrapper}>
        <ScrollView horizontal={true} contentContainerStyle={styles.menuWrapperScroller}>
          <TouchableOpacity style={styles.spieceButton} onPress={() => handleFlockChange('Ssaki')}>
            <Text>Mammals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.spieceButton} onPress={() => handleFlockChange('Ptaki')}>
            <Text>Birds</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.spieceButton} onPress={() => handleFlockChange('Płazy')}>
            <Text>Amphibians</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.spieceButton} onPress={() => handleFlockChange('Ryby')}>
            <Text>Fishes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.spieceButton} onPress={() => handleFlockChange('Gady')}>
            <Text>Reptiles</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.animalsWrapper}>
        {flock === 'All'
          ? caughtAnimals
              .filter((animal) => {
                if (searchPhrase === '') {
                  return animal;
                }
                return animal.name.toLowerCase().startsWith(searchPhrase.toLowerCase());
              })
              .map((animal, index) => {
                return <Animal key={index} animal={animal.name} img={animal.pictureSrc} />;
              })
          : caughtAnimals
              .filter((animal) => animal.flock === flock)
              .filter((animal) => {
                if (searchPhrase === '') {
                  return animal;
                }
                return animal.name.toLowerCase().startsWith(searchPhrase.toLowerCase());
              })
              .map((animal) => (
                <Animal key={animal.id} animal={animal.name} img={animal.pictureSrc} />
              ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 20,
    borderColor: '#9C9D9E',
    borderWidth: 2,
    padding: 10,
    color: '#000'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 33,
    marginTop: 33
  },
  separator: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 41
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold'
  },
  menuWrapper: {
    marginTop: 20,
    height: 50,
    backgroundColor: 'transparent'
  },
  animalsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1
  },
  menuWrapperScroller: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '90%'
  },
  button: {
    color: '#000'
  },
  spieceButtonActive: {
    borderColor: '#0E443B',
    borderRadius: 20,
    borderWidth: 2,
    padding: 10
  }
});
