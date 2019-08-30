import React from 'react'
import moment from 'moment';

import { View, Text, ActivityIndicator } from 'react-native'

export function GameOverHighScores (props) {
  const gameOverHighScoresStyles = {
    container: {
      flex: 3,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
    },
    scoreContainer: {
      backgroundColor: 'blue',
      flexDirection: 'row',
      height: 250
    },
    scoresColumn: {
      flexDirection: 'column',
    }
  }

  if (props.isFetchingScores) {
    return (
      <View style={gameOverHighScoresStyles.container}>
        <ActivityIndicator size='large' color='white'/>
      </View>
    )
  }

  console.log(props.finalScoreData.topThreeScoresToday[0].played_on_ts)

  return (
    <View style={gameOverHighScoresStyles.container}>
      <View style={gameOverHighScoresStyles.scoreContainer}>

        <View style={gameOverHighScoresStyles.scoresColumn}>
          <Text>Scores here</Text>
          <Text>{props.finalScoreData.topThreeScoresToday[0].score}</Text>
          <Text>{props.finalScoreData.topThreeScoresToday[1].score}</Text>
          <Text>{props.finalScoreData.topThreeScoresToday[2].score}</Text>
        </View>

        <View style={gameOverHighScoresStyles.scoresColumn}>
          <Text>Usernames here</Text>
          <Text>{props.finalScoreData.topThreeScoresToday[0].username}</Text>
          <Text>{props.finalScoreData.topThreeScoresToday[1].username}</Text>
          <Text>{props.finalScoreData.topThreeScoresToday[2].username}</Text>
        </View>

        <View style={gameOverHighScoresStyles.scoresColumn}>
          <Text>Touches here</Text>
          <Text>{props.finalScoreData.topThreeScoresToday[0].num_of_touches}</Text>
          <Text>{props.finalScoreData.topThreeScoresToday[1].num_of_touches}</Text>
          <Text>{props.finalScoreData.topThreeScoresToday[2].num_of_touches}</Text>
        </View>

        <View style={gameOverHighScoresStyles.scoresColumn}>
          <Text>Time here</Text>
          <Text>
            {convertTsToLocal(props.finalScoreData.topThreeScoresToday[0].played_on_ts)}
          </Text>
          <Text>
            {convertTsToLocal(props.finalScoreData.topThreeScoresToday[1].played_on_ts)}
          </Text>
          <Text>
            {convertTsToLocal(props.finalScoreData.topThreeScoresToday[2].played_on_ts)}
          </Text>
        </View>

      </View>
    </View>
  )
}

function convertTsToLocal (ts){
  ts = ts.replace(/[TZ]/g, " ").trim()
  let a = moment.utc(ts, 'YYYY-MM-DD HH:mm:ss').toDate()
  let b = moment(a).local().format('ddd h:m:s')
  return b
 }