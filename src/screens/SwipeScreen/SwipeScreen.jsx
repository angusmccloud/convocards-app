import { useState, useEffect, useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import TinderCard from "react-tinder-card";
import { Text, Button } from '../../components';
import useStyles from './SwipeScreenStyles';

const db = [
  { name: 'Richard Hendricks' },
  { name: 'Erlich Bachman' },
  { name: 'Monica Hall' },
  { name: 'Jared Dunn' },
  { name: 'Dinesh Chugtai' },
  { name: 'Bertram Gilfoyle' },
]

export default function SwipeScreen() {
  const theme = useTheme();
  const styles = useStyles(theme);
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.cardContainer}>
        {characters.map((character) =>
          <TinderCard key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <View style={styles.card}>
              {/* <ImageBackground style={styles.cardImage} source={character.img}> */}
                <Text style={styles.cardTitle}>{character.name}</Text>
              {/* </ImageBackground> */}
            </View>
          </TinderCard>
        )}
      </View>
      {lastDirection ? <Text style={styles.infoText}>You swiped {lastDirection}</Text> : <Text style={styles.infoText} />}
    </View>
  )
}
