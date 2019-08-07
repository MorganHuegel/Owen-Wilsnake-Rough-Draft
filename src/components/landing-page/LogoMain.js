import React from 'react';

import { Text, View } from 'react-native';
import { LogoMainOwenFace } from './LogoMainOwenFace';

export function LogoMain(props){
  logoMainStyles = {
    main: {
      flex: 2,
      backgroundColor: 'red'
    },
    header: {
      flex: 1,
      fontSize: 36,
      color: 'rgb(100, 120, 220)',
      textShadowColor: 'rgb(255, 255, 255)',
      textShadowOffset: {width: 10, height: 10},
      textShadowRadius: 10,
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: 'rgba(255, 255, 255, 0.5)'
    }
  }

  return (
    <View style={logoMainStyles.main}>
      <Text style={logoMainStyles.header}>Owen Wil-Snake</Text>
      <LogoMainOwenFace />
    </View>
  )
}