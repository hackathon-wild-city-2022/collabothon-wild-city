import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { Button, Image } from 'react-native';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { CurrentAnimalContext } from '../App';
import AnimalDetailsText from '../components/AnimalDetailsText';
import AnimalDetailsTextSmall from '../components/AnimalDetailsTextSmall';

const image = {
  uri: 'https://ocdn.eu/pulscms-transforms/1/3aPk9kpTURBXy83YzgzYmNiNThjYzM1NjhkZWI0YWIyZmFjNDU3ZmQ0OS5qcGeTlQMAzQFLzQ7YzQhakwmmZTZlOTc0BpMFzQSwzQJ2gaEwAQ/slon-indyjski.jpg'
};

export default function AnimalDetails() {
  const { currentAnimal } = useContext(CurrentAnimalContext);
  const navigation = useNavigation();

  useEffect(() => {
    window.onpopstate = e => {
      navigation.navigate('Trophies');
      e.preventDefault();
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={{ uri: currentAnimal.pictureSrc }}
          resizeMode="cover"
          style={styles.image}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
              <TouchableOpacity onPress={() => navigation.navigate('Trophies')}>
                <Image source={require("../assets/images/arrow_left.png")} width={10} height={20} style={{ width: 10, height: 20, margin: 10 }}></Image>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 10 }}>
              <Text style={styles.headerContainerTitle}>{currentAnimal.name}</Text>
            </View>
            <View style={{ flex: 1 }}></View>

          </View>
        </ImageBackground>
      </View >
      <View style={styles.detailsContainer}>
        <AnimalDetailsText extinctionRisk={currentAnimal.threatLevel} />
        <View style={styles.detailsSmallContainer}>
          <AnimalDetailsTextSmall text={currentAnimal.weight || currentAnimal.flock} icon="mass" />
          <AnimalDetailsTextSmall text={currentAnimal.width || currentAnimal.flock} icon="width" />
          <AnimalDetailsTextSmall text={currentAnimal.height || currentAnimal.flock} icon="height" />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <ScrollView horizontal={false} contentContainerStyle={styles.menuWrapperScroller}>
          <Text style={styles.description}>{currentAnimal.description}</Text>
        </ScrollView>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Donate</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'center'
  },
  headerContainer: {
    flex: 5,
    textAlign: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  headerContainerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  detailsContainer: {
    flex: 3
  },
  detailsSmallContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  descriptionContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    padding: 30
  },
  description: {
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 24,
    color: '#0E443B',
  },
  footerContainer: {
    flex: 2,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#F67D71',
    height: 60,
    width: '90%',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 33,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 60
  }
});
