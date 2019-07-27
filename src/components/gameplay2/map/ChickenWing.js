import React from 'react';

import { Image } from 'react-native';

export function ChickenWing(props){
  const chickenWingStyles = {
    image: {
      width: props.cellDimensions.width,
      height: props.cellDimensions.width,
      position: 'absolute',
      left: props.chickenPosition.left,
      top: props.chickenPosition.top
    }
  }

  return (
    <Image source={require('../../../../chicken-wing.png')} style={chickenWingStyles.image}/>
  )
}