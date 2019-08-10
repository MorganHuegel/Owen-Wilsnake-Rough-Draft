import React from 'react';

import { View, Animated } from 'react-native';

export class LogoMainOwenFace extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      top: new Animated.Value(0)
    }
  }

  render(){
    const logoMainOwenFaceStyle = {
      container: {
        flex: 3,
        justifyContent: 'center'
      },
      face: {
        height: undefined,
        width: undefined,
        flex: 1,
        resizeMode: 'contain',
        top: -100
      }
    }

    return (
      <View style={logoMainOwenFaceStyle.container}>
        <Animated.Image 
          source={require('../../../../OWEN-WILSON.png')} 
          style={logoMainOwenFaceStyle.face}
          />
      </View>
    )
  }
}