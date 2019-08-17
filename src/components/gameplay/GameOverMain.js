import React from 'react';

import { View, Text, Animated } from 'react-native';
import { GameOverMessage } from './GameOverMessage';

export class GameOverMain extends React.Component {
  constructor(props){
    super(props)
    this.screenHeight = this.props.mapDimensions.height + this.props.mapDimensions.headerHeight + 90
    this.state = {
      top: new Animated.Value(-1 * this.screenHeight)
    }
  }

  componentDidMount(){
    Animated.timing(this.state.top, {
      toValue: -45,
      duration: 1000
    }).start()
  }

  render(){
    const gameOverMainStyles = {
      view: {
        position: 'absolute',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        top: this.state.top,
        left: -25,
        height: this.screenHeight,
        width: this.props.mapDimensions.width + 50
      }
    }

    return (
      <Animated.View style={gameOverMainStyles.view}>
        <GameOverMessage backToLanding={this.props.backToLanding} restartGame={this.props.restartGame}/>
      </Animated.View>
    )
  }
}