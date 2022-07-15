//@ts-nocheck

import React, { useContext, useState } from 'react';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AllAnimalsContext, CaughtAnimalsContext } from '../App';
import Animal from '../components/Animal';

export default function CollectedAnimals({ navigation }) {
  const { caughtAnimals } = useContext(CaughtAnimalsContext);
  const { allAnimals } = useContext(AllAnimalsContext);
  const [flock, setFlock] = React.useState('All');
  const [searchPhrase, setSearchPhrase] = useState('');

  const caughtIds = useMemo(() => {
    console.log(caughtAnimals);
    if (!caughtAnimals) {
      return [];
    }
    return caughtAnimals.map((animal) => {
      return animal.id;
    });
  }, [allAnimals, caughtAnimals]);
  console.log('caughtIds', caughtIds);

  const handleFlockChange = (text: string) => {
    setFlock(text);
  };

  const list = useMemo(() => {
    if (searchPhrase === '' && flock === 'All') {
      return allAnimals;
    }
    return allAnimals
      .filter((animal) => {
        return (searchPhrase !== "" && animal.name.toLowerCase().startsWith(searchPhrase.toLowerCase()))
          || (flock !== "" && animal.flock.toLowerCase().startsWith(flock.toLowerCase()));
      })
  }, [searchPhrase, flock, allAnimals])

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
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.animalsWrapper}>
        {
          list.map((animal, index) => {
            return <Animal key={index} animal={animal} img={animal.pictureSrc} enabled={caughtIds.indexOf(animal.id) < 0} navigation={navigation} />;
          })
        }
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
  animalContainer: {
    display: 'flex',
  },
  animalsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200,
    paddingBottom: 250,
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
