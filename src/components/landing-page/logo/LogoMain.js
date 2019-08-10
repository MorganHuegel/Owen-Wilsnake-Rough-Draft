import React from 'react';

import { View, Image } from 'react-native';
import { LogoMainOwenFace } from './LogoMainOwenFace';

export function LogoMain(props){
  logoMainStyles = {
    container: {
      flex: 2,
      backgroundColor: 'red',
      display: 'flex',
      justifyContent: 'center'
    },
    logoWords: {
      resizeMode: 'contain',
      width: undefined,
      height: undefined,
      flex: 1
    }
  }

  return (
    <View style={logoMainStyles.container} onLayout={(e) => console.log(e.nativeEvent.layout)}>
      <Image source={require('./logoWords.png')} style={logoMainStyles.logoWords}/>
      {/* <LogoMainOwenFace /> */}
    </View>
  )
}