import React from 'react';
import { Text, View } from 'react-native';

export const BallToEatCell = (props) => {
  return (
    <View style={stylesBallToEat.ballToEatCell}>
      <Text style={stylesBallToEat.ballToEatDot}></Text>
    </View>
  )
}

stylesBallToEat = {
  ballToEatCell: {
    borderRadius: 80,
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ballToEatDot: {
    width: 8,
    height: 8,
    borderRadius: 80,
    backgroundColor: 'blue'
  }
}
