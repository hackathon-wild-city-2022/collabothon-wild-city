import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Container, { Toast } from 'toastify-react-native';

export const showNotification = async () => {
  Toast.success('Elephants bath is at 10.45');
};

export function Notification() {
  useEffect(() => {
    showNotification();
  }, []);

  return (
    <View style={styles.container}>
      <Container position="top" animationStyle="fancy" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
