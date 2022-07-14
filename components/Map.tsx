import React from 'react';
import { Image, ScrollView } from 'react-native';

export default function Map() {
  return (
    <ScrollView style={{ flex: 1 }} horizontal={true}>
      <Image style={{ width: 2099 }} source={require('../assets/images/map.png')} />
    </ScrollView>
  );
}
