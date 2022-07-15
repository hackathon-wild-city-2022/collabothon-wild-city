import React from 'react';
import { Image, ScrollView, View } from 'react-native';
// @ts-ignore
import MapAsSvg from '../assets/images/zoo_map.svg';

export default function Map() {
  return (
    <ScrollView style={{ flex: 1, overflowY: 'scroll' }} directionalLockEnabled={false} horizontal={true}>
        <ScrollView nestedScrollEnabled={true}>
            <MapAsSvg width="2099"/>
        </ScrollView>
    </ScrollView>
  );
}
