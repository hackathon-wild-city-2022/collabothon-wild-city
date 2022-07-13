import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CollectedAnimals() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zebrane zwierzęta</Text>
      <TextInput style={styles.input} placeholder="Wyszukaj zwierzę" />
      <View style={styles.separator}>
        <Text style={styles.subtitle}>Kategoria</Text>
        <Button
          onPress={() => {}}
          title="Zobacz wszystkie"
          color="transparent"
          accessibilityLabel="Zobacz wszystkie zwierzęta"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 20,
    borderColor: '#9C9D9E',
    borderWidth: 2,
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
    color: '#fff',
    fontWeight: 'bold'
  }
});
