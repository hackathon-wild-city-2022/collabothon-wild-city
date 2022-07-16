import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';

export default function AnimalDetailsTextSmall(props: { text: string, icon: string }) {
  const { text, icon } = props;
  let image = require("../assets/images/icon_mass.png");
  if (icon == 'width')
    image = require("../assets/images/icon_width.png");
  if (icon == 'height')
    image = require("../assets/images/icon_height.png");


  return <Text style={styles.animalDetail}>
    <Image source={image} style={{ width: 30, height: 15 }}></Image>
    &nbsp;{text}
  </Text>;
}

const styles = StyleSheet.create({
  animalDetail: {
    height: 46,
    color: '#fff',
    backgroundColor: '#1D8776',
    // width: 107,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 46,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center'
  }
});
