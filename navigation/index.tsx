/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image, Pressable, TouchableOpacity, View } from 'react-native';
import Map from '../components/Map';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AnimalDetails from '../screens/AnimalDetails';
import CollectedAnimals from '../screens/CollectedAnimals';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfilePage from '../screens/ProfilePage';
import TopScores from '../screens/TopScores';
// const image from '..'

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -12,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onPress={onPress}>
      <View
        style={{
          width: 82,
          height: 82,
          borderRadius: 41,
          backgroundColor: '#0E443B',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Trophies"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
        tabBarIconStyle: { backgroundColor: '#fff', height: 86 }
      }}>
      <BottomTab.Screen
        name="Trophies"
        component={CollectedAnimals}
        options={({ navigation }: RootTabScreenProps<'Trophies'>) => ({
          title: 'Trofea',
          headerShown: false,
          tabBarIcon: ({ color }) => <Image source={require('../assets/images/Frame_1.png')} />
        })}
      />
      <BottomTab.Screen
        name="Ranking"
        component={TopScores}
        options={{
          title: 'Ranking',
          headerShown: false,
          tabBarIcon: ({ color }) => <Image source={require('../assets/images/star.png')} />
        }}
      />
      <BottomTab.Screen
        name="Camera"
        component={AnimalDetails}
        options={{
          title: 'Aparat',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/camera.png')}
              resizeMode="contain"
              style={{ width: 30, height: 30, tintColor: '#fff' }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />
        }}
      />
      <BottomTab.Screen
        name="Map"
        component={Map}
        options={{
          title: 'Mapa',
          headerShown: false,
          tabBarIcon: ({ color }) => <Image source={require('../assets/images/map.png')} />
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          title: 'Profil',
          headerShown: false,
          tabBarIcon: ({ color }) => <Image source={require('../assets/images/user.png')} />
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
