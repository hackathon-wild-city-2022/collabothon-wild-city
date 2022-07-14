import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import UploadImage from '../components/UploadImage';

export default function ProfilePage() {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isVibrateEnabled, setIsVibrateEnabled] = useState(false);

  const toggleSwitchNotification = () =>
    setIsNotificationEnabled((previousState) => !previousState);
  const toggleSwitchSound = () => setIsSoundEnabled((previousState) => !previousState);
  const toggleSwitchVibrate = () => setIsVibrateEnabled((previousState) => !previousState);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.name}>Cześć Karolina!</Text>
        <Text style={styles.points}>Masz 45 punktów</Text>
      </View>
      <View style={styles.settingsContainer}>
        <View style={styles.uploadImageWrapper}>
          <UploadImage />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Edytuj profil</Text>
        </TouchableOpacity>
        <View style={styles.settingWrapper}>
          <Text style={styles.settingName}>Powiadomienia</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#1D8776' }}
            thumbColor={isNotificationEnabled ? '#24A993' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchNotification}
            value={isNotificationEnabled}
          />
        </View>
        <View style={styles.settingWrapper}>
          <Text style={styles.settingName}>Wibracje</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#1D8776' }}
            thumbColor={isVibrateEnabled ? '#24A993' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchVibrate}
            value={isVibrateEnabled}
          />
        </View>
        <View style={styles.settingWrapper}>
          <Text style={styles.settingName}>Dźwięki</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#1D8776' }}
            thumbColor={isSoundEnabled ? '#24A993' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchSound}
            value={isSoundEnabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: '#24A993',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0E443B',
    width: 191,
    height: 46,
    borderRadius: 20,
    alignSelf: 'center'
  },
  buttonText: { color: '#fff', textAlign: 'center', lineHeight: 46 },
  header: {
    flex: 3,
    paddingTop: 50,
    alignItems: 'center'
  },
  uploadImageWrapper: { alignSelf: 'center', marginTop: -170, marginBottom: 50 },
  name: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 30
  },
  points: { fontSize: 16, color: '#fff' },
  settingsContainer: {
    flex: 7,
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center'
  },
  settingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1
  },
  settingName: {
    color: '#000'
  }
});
