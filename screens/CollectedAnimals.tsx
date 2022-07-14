import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animal from '../components/Animal';

export default function CollectedAnimals() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zebrane zwierzęta</Text>
      <TextInput style={styles.input} placeholder="Wyszukaj zwierzę" />
      <View style={styles.separator}>
        <Text style={styles.subtitle}>Kategoria</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text>Zobacz wszystkie</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuWrapper}>
        <ScrollView horizontal={true} contentContainerStyle={styles.menuWrapperScroller}>
          <TouchableOpacity style={styles.spieceButton} onPress={() => {}}>
            <Text>Ssaki</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.spieceButton} onPress={() => {}}>
            <Text>Ptaki</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.spieceButton} onPress={() => {}}>
            <Text>Płazy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.spieceButton} onPress={() => {}}>
            <Text>Ryby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.spieceButton} onPress={() => {}}>
            <Text>Gady</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.animalsWrapper}>
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
        <Animal />
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
    justifyContent: 'center'
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
