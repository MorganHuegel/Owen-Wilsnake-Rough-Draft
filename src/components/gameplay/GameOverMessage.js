import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

export function GameOverMessage(props){
  const gameOverMessageStyles = {
    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 100
    },
    text: {
      color: 'white',
      fontSize: 40
    },
    button1: {
      backgroundColor: 'yellow',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
      backgroundColor: 'rgb(230, 230, 230)',
      borderWidth: 4,
      borderColor: 'rgb(70, 80, 120)',
      padding: 20,
      minWidth: 200
    },
    button1Text: {
      color: 'rgb(70, 80, 120)',
      fontSize: 40
    },
    button2: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
      borderColor: 'rgb(230, 230, 230)',
      borderWidth: 4,
      backgroundColor: 'rgb(70, 80, 120)',
      padding: 20,
      minWidth: 200
    },
    button2Text: {
      color: 'rgb(230, 230, 230)'
    }
  }

  return (
    <View style={gameOverMessageStyles.container}>
      
      <View style={gameOverMessageStyles.textContainer}>
        <Text style={gameOverMessageStyles.text}>Game over, loser!</Text>
      </View>

      <TouchableOpacity onPress={() => props.restartGame()} style={gameOverMessageStyles.button1}>
        <Text style={gameOverMessageStyles.button1Text}>Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.backToLanding()} style={gameOverMessageStyles.button2}>
        <Text style={gameOverMessageStyles.button2Text}>Back to Landing</Text>
      </TouchableOpacity>

    </View>
  )
}