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
        flex: 1
      },
      face: {
        flex: 1,
        left: -100
        // width: undefined,
        // height: undefined
      }
    }

    return (
      <View style={logoMainOwenFaceStyle.container}>
        <Animated.Image 
          source={require('../../../OWEN-WILSON.png')} 
          style={logoMainOwenFaceStyle.face}
          resizeMode='contain'/>
      </View>
    )
  }
}