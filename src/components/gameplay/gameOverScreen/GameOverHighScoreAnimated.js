import React from 'react'

import { View, Text, Animated } from 'react-native';
import { convertTsToLocal } from './GameOverHighScores'

export class GameOverHighScoreAnimated extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      bgColor: new Animated.Value(0)
    }
  }

  render(){
    return (
      <View style={[this.props.styles.row, {backgroundColor: 'green'}]} key={this.props.game.id}>
        <Text style={[this.props.styles.scoreSpan]}>{this.props.game.score}</Text>
        <Text style={[this.props.styles.usernameSpan]} ellipsizeMode='tail' numberOfLines={1}>{this.props.game.username}</Text>
        <Text style={[this.props.styles.numTouchesSpan]}>{this.props.game.num_of_touches}</Text>
        <Text style={[this.props.styles.dateSpan]} adjustsFontSizeToFit>{convertTsToLocal(this.props.game.played_on_ts)}</Text>
      </View>
    )
  }
}