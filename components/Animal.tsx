import React from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Animal() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/zebra.jpg')} style={styles.image} />
      <Text style={styles.animalTitle}>Zebra</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width:100,
    height:100,
    borderRadius:50,
  },
  animalTitle: {
    fontSize: 18,
    color: '#000',
    marginTop:12,
  },
  container: {
    display: 'flex',
    alignContent: 'center',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    
    margin:10,
  }
});
