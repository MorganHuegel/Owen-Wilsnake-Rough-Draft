import React from 'react';
import { Text, View, Image } from 'react-native';

export const BallToEatCell = (props) => {
  return (
    <View style={stylesBallToEat.ballToEatCell}>
      <Image source={require('../../../../chicken-wing.png')} style={stylesBallToEat.chicken}/>
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
  chicken: {
    width: 35,
    height: 26.7,
  }
}
