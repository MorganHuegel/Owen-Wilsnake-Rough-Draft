import React from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

export function GameOverButtons (props) {
  const gameOverButtonStyles = {
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      paddingBottom: 50
      //backgroundColor: 'blue'
    },
    button1: {
      backgroundColor: 'yellow',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'rgb(230, 230, 230)',
      // borderWidth: 2,
      // borderColor: 'rgb(70, 80, 120)',
      borderColor: 'rgb(230, 230, 230)',
      borderWidth: 2,
      backgroundColor: 'rgb(70, 80, 120)',
      padding: 10,
      height: 60
    },
    button1Text: {
      color: 'rgb(230, 230, 230)',
      fontSize: 20
    },
    button2: {
      // justifyContent: 'center',
      justifyContent: 'flex-end',
      alignItems: 'center',
      //borderColor: 'rgb(230, 230, 230)',
      //borderWidth: 2,
      //backgroundColor: 'rgb(70, 80, 120)',
      //height: 60
    },
    button2Text: {
      color: 'rgb(230, 230, 230)',
      textDecorationLine: 'underline'
    }
  }

  return (
    <View style={gameOverButtonStyles.container}>
      <TouchableOpacity onPress={() => props.restartGame()} style={gameOverButtonStyles.button1}>
        <Text style={gameOverButtonStyles.button1Text}>Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.backToLanding()} style={gameOverButtonStyles.button2}>
        <Text style={gameOverButtonStyles.button2Text}>Back to Landing</Text>
      </TouchableOpacity>
    </View>
  )
}