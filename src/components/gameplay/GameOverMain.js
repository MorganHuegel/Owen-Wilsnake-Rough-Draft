import React from 'react';

import { View, Text, Animated } from 'react-native';

export function GameOverMain (props) {
  const gameOverMainStyles = {
    view: {
      position: 'absolute',
      flex: 1,
      backgroundColor: 'green',
      top: 0,
      left: 0
    }
  }

  return (
    <Animated.View style={gameOverMainStyles.view}>
      <Text>GameOverScreen</Text>
    </Animated.View>
  )
}