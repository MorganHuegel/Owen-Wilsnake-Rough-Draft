import React from 'react'

import { View, Text } from 'react-native'

export function GameOverHighScores (props) {
  const gameOverHighScoresStyles = {
    container: {
      flex: 3,
      backgroundColor: 'red'
    }
  }
  return (
    <View style={gameOverHighScoresStyles.container}>
      <Text>Gameover high scores</Text>
    </View>
  )
}