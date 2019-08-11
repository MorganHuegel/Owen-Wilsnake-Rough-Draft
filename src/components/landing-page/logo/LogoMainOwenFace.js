import React from 'react';

import { Animated } from 'react-native';

export class LogoMainOwenFace extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      bottom: new Animated.Value(props.containerHeight * 1/6)
    }
    this.styling = {
      ...this.props.styleProps,
      bottom: this.state.bottom
    }
  }

  render(){
    console.log('IN HERE', this.styling)
    return (
      <Animated.Image 
        source={require('./owen-face-with-border.png')} 
        style={this.styling}
      />
    )
  }
}