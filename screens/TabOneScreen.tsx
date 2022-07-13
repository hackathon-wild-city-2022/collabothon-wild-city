// import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Button, Image, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.logo}
        source={require('@expo/snack-static/react-native-logo.png')}
      /> */}
      <Text style={styles.title}>Play and save animals</Text>
      <Text style={styles.title}>discover new wildlife experience</Text>
      <Text style={styles.title}>Log in</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" />
      <Button title="Log in" onPress={() => {}} />
      <Text style={styles.title}>Forgot your password?</Text>
      <Text style={styles.title}>or</Text>
      <Text style={styles.title}>Don't have an account yet? Join us!</Text>
      {/* <GoogleSigninButton
  style={{ width: 192, height: 48 }}
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  // onPress={}
  // disabled={}
/>; */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  logo: {},
  input: {}
});
