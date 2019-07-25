import React from 'react';

import { Image } from 'react-native';

export class OwenSnakeMain extends React.Component {
  constructor (props) {
    super(props)
  }


  render(){
    owenFaceStyles = {
      singleFace: {
        width: this.props.cellDimensions.width,
        height: this.props.cellDimensions.height,
        position: 'absolute',
        left: 0,
        top: 0
      }
    }

    return <Image source={require('../../../../../OWEN-WILSON.png')} style={owenFaceStyles.singleFace}/>
  }
}