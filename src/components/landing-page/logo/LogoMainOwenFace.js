import React from 'react';

import { Animated } from 'react-native';

export function LogoMainOwenFace (props) {
  return (
    <Animated.Image 
      source={require('./owen-face-with-border.png')} 
      style={props.styleProps}
    />
  )
}