import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Leaderboard from 'react-native-leaderboard';

const state = {
  data: [
    { userName: 'Joe', highScore: 52 },
    { userName: 'Jenny', highScore: 120 },
    { userName: 'Joe', highScore: 52 },
    { userName: 'Jenny', highScore: 120 },
    { userName: 'Joe', highScore: 52 },
    { userName: 'Jenny', highScore: 120 },
    { userName: 'Joe', highScore: 52 },
    { userName: 'Jenny', highScore: 120 },
    { userName: 'Joe', highScore: 52 },
    { userName: 'Jenny', highScore: 120 },
    { userName: 'Joe', highScore: 52 },
    { userName: 'Jenny', highScore: 120 }
    //...
  ] //can also be an object of objects!: data: {a:{}, b:{}}
};

export default function TopScores() {
  return (
    <View style={styles.TopScoresContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Top scores</Text>

        {/* <View style={styles.firstPlace}></View>
        <View style={styles.secondPlace}></View>
        <View style={styles.thirdPlace}></View> */}
      </View>
      <View style={styles.leaderboardContainer}>
        <Leaderboard data={state.data} sortBy="highScore" labelBy="userName" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leaderboardContainer: {
    flex: 3,
    backgroundColor: '#24A993'
  },
  firstPlace: {
    position: 'absolute',
    backgroundColor: '#ffd700',
    height: 100,
    width: 50,
    bottom: 0,
    right: '45%'
  },
  secondPlace: {
    position: 'absolute',
    backgroundColor: '#c0c0c0',
    height: 75,
    width: 50,
    bottom: 0,
    right: '65%'
  },
  thirdPlace: {
    position: 'absolute',
    backgroundColor: '#967444',
    height: 50,
    width: 50,
    bottom: 0,
    right: '25%'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    marginTop: -20,
    backgroundColor: '#24A993'
  },
  TopScoresContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 24,
    color: '#fff'
  }
});
