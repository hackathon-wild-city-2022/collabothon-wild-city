import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fetchAllAnimal, fetchCaughtAnimals } from './hooks/state';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export const CurrentAnimalContext = createContext(null);
export const CorrectAnswerContext = createContext({});
export const AllAnimalsContext = createContext({});
export const CaughtAnimalsContext = createContext({});
export const DeviceIdContext = createContext("");
export const CurrentUserContext = createContext({});
export const QuizQuestionsContext = createContext({});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [currentAnimal, setCurrentAnimal] = useState({} as any);
  const [allAnimals, setAllAnimals] = useState([] as any[]);
  const [caughtAnimals, setCaughtAnimals] = useState([] as any[]);
  const [currentUser, setCurrentUser] = useState({} as any);
  const [quizQuestions, setQuizQuestions] = useState({} as any);
  const [deviceId, setDeviceId] = useState({} as any);
  const [correctAnswer, setCorrectAnswer] = useState(false as boolean);

  useEffect(() => {
    (async () => {
      console.log("asdf");
      getDeviceId();
      setAllAnimals(await fetchAllAnimal(deviceId));
      setCaughtAnimals(await fetchCaughtAnimals(deviceId));
    })();
  }, []);

  const getDeviceId = async () => {
    const value = await AsyncStorage.getItem('deviceId');
    if (value !== null) {
      setDeviceId(value);
      console.log("Unique ID readed: " + value);
    } else {
      const device = Math.random() + "." + Math.random() + "." + Math.random() + "." + Math.random() + "." + Math.random() + "." + Math.random();
      setDeviceId(device);
      await AsyncStorage.setItem('deviceId', device);
      console.log("Unique ID:" + device);
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <CorrectAnswerContext.Provider value={{ correctAnswer, setCorrectAnswer }}>
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <DeviceIdContext.Provider value={{ deviceId, setDeviceId }}>
              <AllAnimalsContext.Provider value={{ allAnimals, setAllAnimals }}>
                <CaughtAnimalsContext.Provider value={{ caughtAnimals, setCaughtAnimals }}>
                  <CurrentAnimalContext.Provider value={{ currentAnimal, setCurrentAnimal }}>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                  </CurrentAnimalContext.Provider>
                </CaughtAnimalsContext.Provider>
              </AllAnimalsContext.Provider>
            </DeviceIdContext.Provider>
            <QuizQuestionsContext.Provider value={{ quizQuestions, setQuizQuestions }}>
            </QuizQuestionsContext.Provider>
          </CurrentUserContext.Provider>
        </CorrectAnswerContext.Provider>
      </SafeAreaProvider>
    );
  }
}
