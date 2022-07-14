import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AnimalDetailsText from '../components/AnimalDetailsText';
import AnimalDetailsTextSmall from '../components/AnimalDetailsTextSmall';

const image = {
  uri: 'https://ocdn.eu/pulscms-transforms/1/3aPk9kpTURBXy83YzgzYmNiNThjYzM1NjhkZWI0YWIyZmFjNDU3ZmQ0OS5qcGeTlQMAzQFLzQ7YzQhakwmmZTZlOTc0BpMFzQSwzQJ2gaEwAQ/slon-indyjski.jpg'
};

export default function AnimalDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.headerContainerTitle}>Słoń indyjski</Text>
        </ImageBackground>
      </View>
      <View style={styles.detailsContainer}>
        <AnimalDetailsText />
        <View style={styles.detailsSmallContainer}>
          <AnimalDetailsTextSmall />
          <AnimalDetailsTextSmall />
          <AnimalDetailsTextSmall />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <ScrollView horizontal={false} contentContainerStyle={styles.menuWrapperScroller}>
          <Text style={styles.description}>
            Jest największym ssakiem lądowym żyjącym na ziemi. Od 1986 r. słoń azjatycki jest
            opisywany w Czerwonej Księdze Zwierząt IUCN jako gatunek zagrożony - w ciągu ostatnich
            60-75 lat jego liczebność zmniejszyła się ok. 50 procent. Trąba słoni, która powstała w
            wyniku połączenia nosa i górnej wargi służy do chwytania, pobierania pokarmu i wody, a
            także do i komunikacji ze stadem. Zwierzęta te spożywają głównie trawy, liście, mniejsze
            gałęzie i owoce. Ich żołądki trawią pokarm mało efektywnie – nawet 50 % karmy opuszcza
            ciało słonia w tej samej formie w jakiej do niego trafiło. To dlatego słonie są zmuszone
            do poświęcania tak dużej ilości czasu (nawet 18 – 20 godzin na dobę) na poszukiwanie i
            zjadanie pokarmu. Podczas tych wędrówek wydeptują w dżungli prawdziwe leśne autostrady,
            z których potem korzystają ludzie i inne zwierzęta.Dziennie dorosły słoń potrafi zjeść
            nawet do 200 kg.Zwierzęta te żyją ok 60-70 lat.Gatunek zagrożony jest przede wszystkim
            niszczeniem, fragmentacją i utratą siedlisk. Istotnym problemem jest też kłusownictwo –
            słonie zabijane są nie tylko dla ciosów, ale też dla skóry.
          </Text>
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
