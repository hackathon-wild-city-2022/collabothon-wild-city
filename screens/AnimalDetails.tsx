import React, { useContext } from 'react';
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

export const currentAnimal = {
  id: 1,
  name: 'Alutera pisana',
  latinName: 'Aluterus scriptus',
  flock: 'Ryby',
  pictureSrc: 'https://orientarium.lodz.pl/assets/2022/04/alutera-pisana-2-591x601.jpg',
  weight: '2,5 kg',
  width: '55-110 cm',
  height: '',
  threatLevel: 'Najniższego ryzyka LC',
  summary:
    'Alutery występują w płytkich wodach o głębokości do 120 m. W skład ich diety wchodzą głównie wodorosty, osłonice i ukwiały.',
  description: 'Ryba ta jest powszechna w całym rejonie swojego występowania.',
  originPlace: 'https://orientarium.lodz.pl/assets/2022/04/mapa_szablon_alutera_pisana-591x349.jpg'
};

export default function AnimalDetails() {
  // const { currentAnimal } = useContext(CurrentAnimalContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={{ uri: currentAnimal.pictureSrc }}
          resizeMode="cover"
          style={styles.image}>
          <Text style={styles.headerContainerTitle}>{currentAnimal.name}</Text>
        </ImageBackground>
      </View>
      <View style={styles.detailsContainer}>
        <AnimalDetailsText extinctionRisk={currentAnimal.threatLevel} />
        <View style={styles.detailsSmallContainer}>
          <AnimalDetailsTextSmall text={currentAnimal.weight || currentAnimal.flock} />
          <AnimalDetailsTextSmall text={currentAnimal.width || currentAnimal.flock} />
          <AnimalDetailsTextSmall text={currentAnimal.height || currentAnimal.flock} />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <ScrollView horizontal={false} contentContainerStyle={styles.menuWrapperScroller}>
          <Text style={styles.description}>{currentAnimal.description}</Text>
        </ScrollView>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Przekaż datek</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 16
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
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 60
  }
});
