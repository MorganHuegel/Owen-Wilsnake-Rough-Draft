import React from 'react';

import { View } from 'react-native';
import { LogoMainOwenFace } from './LogoMainOwenFace';

export class LogoMainOwenFaceContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      containerHeight: null,
      containerWidth: null
    }
  }

  logoMainOwenFaceContainerStyle = {
    container: {
      flex: 3,
      justifyContent: 'center'
    }
  }

  render () {
    let owenFaces = []
    const numOfFaces = 10

    if (this.state.containerHeight && this.state.containerHeight) {
      for (let i = 0; i < numOfFaces; i++) {
        console.log('i: ', i)
        const styleProps = {
          flex: 1,
          position: 'absolute',
          height: Math.pow(1/2, i) * this.state.containerHeight,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          width: Math.pow(1/2, i) * this.state.containerHeight * (6/7),
          left: Math.pow(1/2, i+2) * this.state.containerWidth,
          zIndex: numOfFaces - i
        }

        owenFaces.push(
          <LogoMainOwenFace key={'owenFace' + i} styleProps={styleProps} containerHeight={this.state.containerHeight}/>
        )
      }
    }


    return (
      <View 
        style={this.logoMainOwenFaceContainerStyle.container} 
        onLayout={event => this.setState({
          containerHeight: event.nativeEvent.layout.height,
          containerWidth: event.nativeEvent.layout.width
        })}>

        {owenFaces}

      </View>
    )
  }
}