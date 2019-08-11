import React from 'react';

import { Animated } from 'react-native';

export function SingleOwenFace(props){
  owenFaceStyles = {
    singleFace: {
      width: props.cellDimensions.width,
      height: props.cellDimensions.height,
      position: 'absolute',
      left: props.face.left,
      top: props.face.top
    }
  }

  return <Animated.Image source={require('../../../../../OWEN-WILSON.png')} style={owenFaceStyles.singleFace}/>
}
