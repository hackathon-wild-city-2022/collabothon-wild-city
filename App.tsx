import { StatusBar } from 'expo-status-bar';
import React, { createContext, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export const CurrentAnimalContext = createContext({});
export const CaughtAnimalsContext = createContext({});
export const CurrentUserContext = createContext({});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [currentAnimal, setCurrentAnimal] = useState({} as any);
  const [caughtAnimals, setCaughtAnimals] = useState([] as any[]);
  const [currentUser, setCurrentUser] = useState({} as any);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('http://zoo.dwiegodzinydonikad.pl/animals/unlocked');
    const data = await response.json();
    setCaughtAnimals(data);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <CaughtAnimalsContext.Provider value={{ caughtAnimals, setCaughtAnimals }}>
            <CurrentAnimalContext.Provider value={{ currentAnimal, setCurrentAnimal }}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </CurrentAnimalContext.Provider>
          </CaughtAnimalsContext.Provider>
        </CurrentUserContext.Provider>
      </SafeAreaProvider>
    );
  }
}
