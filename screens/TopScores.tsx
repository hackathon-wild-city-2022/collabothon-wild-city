import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Leaderboard from 'react-native-leaderboard';
import { DeviceIdContext } from '../App';
import { fetchRanking } from '../hooks/state';

export default function TopScores() {
  const { deviceIdContext, setDeviceIdContext } = useContext(DeviceIdContext);
  const [topScores, setTopScores] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchRanking(deviceIdContext);
      setTopScores(data.map((elem) => {
        return { userName: elem.nickname, highScore: elem.count };
      }));
    })();
  }, [deviceIdContext]);

  return (
    <View style={styles.TopScoresContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Leadboard</Text>
        <Image source={require("../assets/images/ranking.png")} style={styles.rankingImage} />
      </View>
      <View style={styles.leaderboardContainer}>
        <Leaderboard data={topScores} sortBy="highScore" labelBy="userName" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rankingImage: {
    marginTop: 20,
  },
  leaderboardContainer: {
    flex: 3,
    backgroundColor: '#24A993',
    marginTop: -20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingTop: 50,
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
