import React from 'react'
import moment from 'moment';

import { View, Text, ActivityIndicator } from 'react-native'

export function GameOverHighScores (props) {
  const gameOverHighScoresStyles = {
    container: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: 40
    },
    scoreContainer: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: 250,
      borderWidth: 4,
      borderColor: 'rgb(255, 255, 255)',
    },
    headerText: {
      textAlign: 'center',
      fontSize: 25,
      color: 'rgb(220, 220, 220)'
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      borderColor: 'rgb(220, 220, 220)',
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: 'rgb(220, 220, 220)',
      maxHeight: 40,
      paddingHorizontal: 10,
      alignItems: 'center'
    },
    scoreSpan: {
      flex: 2
    },
    usernameSpan: {
      flex: 4
    },
    numTouchesSpan: {
      flex: 1
    },
    dateSpan: {

    },
  }

  if (props.isFetchingScores) {
    return (
      <View style={gameOverHighScoresStyles.container}>
        <ActivityIndicator size='large' color='white'/>
      </View>
    )
  }

  const tableRows = props.finalScoreData.topThreeScoresToday.map(game => {
    return <View style={gameOverHighScoresStyles.row} key={game.id}>
      <Text style={gameOverHighScoresStyles.scoreSpan}>{game.score}</Text>
      <Text style={gameOverHighScoresStyles.usernameSpan}>{game.username}</Text>
      <Text style={gameOverHighScoresStyles.numTouchesSpan}>{game.num_of_touches}</Text>
      <Text style={gameOverHighScoresStyles.dateSpan} adjustsFontSizeToFit>{convertTsToLocal(game.played_on_ts)}</Text>
    </View>
  })


  return (
    <View style={gameOverHighScoresStyles.container}>
      <View style={gameOverHighScoresStyles.scoreContainer}>
        <Text style={gameOverHighScoresStyles.headerText}>Top Scores Today</Text>
        {tableRows}

      </View>
    </View>
  )
}

function convertTsToLocal (ts){
  ts = ts.replace(/[TZ]/g, " ").trim()
  let a = moment.utc(ts, 'YYYY-MM-DD HH:mm:ss').toDate()
  let b = moment(a).local().format('ddd hh:mm a')
  return b
 }