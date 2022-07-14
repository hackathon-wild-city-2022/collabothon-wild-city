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
import { ColorSchemeName, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Map from '../components/Map';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AnimalDetails from '../screens/AnimalDetails';
import CollectedAnimals from '../screens/CollectedAnimals';
import ModalScreen from '../screens/ModalScreen';
import PlayQuiz from '../screens/PlayQuizScreen'
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfilePage from '../screens/ProfilePage';
import TabTwoScreen from '../screens/TabTwoScreen';
import TopScores from '../screens/TopScores';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ResultScreen from '../screens/ResultScreen';
import { OptimizerConstructors } from '@tensorflow/tfjs';

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
      <Stack.Screen name="Camera" component={TabTwoScreen} options={{ title: 'Camera' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ title: 'ResultScreen' }} />
      <Stack.Screen name="PlayQuiz" component={PlayQuiz} options={{ title: 'PlayQuiz' }} />
      <Stack.Screen name="AnimalDetails" component={AnimalDetails} options={{ title: 'AnimalDetails' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}


function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View key={"asdf"} style={{ flexDirection: 'row', backgroundColor: "#ffffff", height: 70, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        let image = require("../assets/images/menu_map.png");
        if(options.imageSrc == 'star'){
          image = require("../assets/images/menu_star.png");
        }
        if(options.imageSrc == 'trophy'){
          image = require("../assets/images/menu_trophy.png");
        }
        if(options.imageSrc == 'photo'){
          image = require("../assets/images/menu_photo.png");
        }
        if(options.imageSrc == 'profile'){
          image = require("../assets/images/menu_profile.png");
        }

        return (
          <TouchableOpacity key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <View>
              <Image source={image} />
            </View>

          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const styles = StyleSheet.create({
  menuWrapper: {
    backgroundColor: '#ffffff',
  },
});

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Camera"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint
      }}>
      <BottomTab.Screen
        name="Trophies"
        component={CollectedAnimals}
        options={({ navigation }: RootTabScreenProps<'Trophies'>) => ({
          title: 'Trofea',
          headerShown: false,
          imageSrc: 'trophy'
        })}
      />
      <BottomTab.Screen
        name="Ranking"
        component={TopScores}
        options={({ navigation }: RootTabScreenProps<'Ranking'>) => ({
          title: 'Ranking',
          headerShown: false,
          imageSrc: 'star'
        })}
      />
      <BottomTab.Screen
        name="Camera"
        component={TabTwoScreen}
        options={({ navigation }: RootTabScreenProps<'Camera'>) => ({
          title: 'Aparat',
          headerShown: false,
          imageSrc: 'photo'
        })}
      />
      <BottomTab.Screen
        name="Map"
        component={Map}
        options={({ navigation }: RootTabScreenProps<'Map'>) => ({
          title: 'Mapa',
          headerShown: false,
          imageSrc: 'map'
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfilePage}
        options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
          title: 'Profil',
          headerShown: false,
          imageSrc: 'profile'
        })}
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
