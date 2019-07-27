import React from 'react';

import { View, Animated, Easing } from 'react-native';
import { SingleOwenFace } from './SingleOwenFace';

export class OwenSnakeMain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      snakeBody: [
        {
          left: new Animated.Value(0),
          top: new Animated.Value(0),
          moving: 'right'
        }
      ]
    }

    this.millisecondsPerPixel = 4000 / this.props.mapDimensions.width
  }

  _goRight(snakeBodyIndex){
    const pxToGo = (this.props.mapDimensions.width - this.props.cellDimensions.width) - this.state.snakeBody[snakeBodyIndex].left.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].top.stopAnimation()

    Animated.timing(this.state.snakeBody[snakeBodyIndex].left, {
      toValue: this.props.mapDimensions.width - this.props.cellDimensions.width,
      easing: Easing.linear,
      duration: timeBeforeWall
    }).start(() => {
      console.log('DEAD! HIT THE RIGHT WALL!')
    })
  }

  _goLeft(snakeBodyIndex){
    const pxToGo = this.state.snakeBody[snakeBodyIndex].left.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].top.stopAnimation()

    Animated.timing(this.state.snakeBody[snakeBodyIndex].left, {
      toValue: 0,
      easing: Easing.linear,
      duration: timeBeforeWall
    }).start(() => {
      console.log('DEAD! HIT THE LEFT WALL!')
    })
  }

  _goDown(snakeBodyIndex){
    const pxToGo = (this.props.mapDimensions.height - this.props.cellDimensions.height) - this.state.snakeBody[snakeBodyIndex].top.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].left.stopAnimation()

    Animated.timing(this.state.snakeBody[snakeBodyIndex].top, {
      toValue: this.props.mapDimensions.height - this.props.cellDimensions.height,
      easing: Easing.linear,
      duration: timeBeforeWall
    }).start(() => {
      console.log('DEAD! HIT THE BOTTOM WALL!')
    })
  }

  _goUp(snakeBodyIndex){
    const pxToGo = this.state.snakeBody[snakeBodyIndex].top.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].left.stopAnimation()

    Animated.timing(this.state.snakeBody[snakeBodyIndex].top, {
      toValue: 0,
      easing: Easing.linear,
      duration: timeBeforeWall
    }).start(() => {
      console.log('DEAD! HIT THE TOP WALL!')
    })
  }

  componentDidMount(){
    //this._goRight(0)
    //setTimeout(() => {
    //  this._goDown(0)
    //}, 1000)
  }


  render(){
    const snake = this.state.snakeBody.map( (face, index) => {
      return <SingleOwenFace face={face} cellDimensions={this.props.cellDimensions} key={'face' + index}/>
    })

    let OwenSnakeMainStyle = {
      position: 'absolute',
      top: 0,
      left: 0
    }

    return (
      <View style={OwenSnakeMainStyle}>
        {snake}
      </View>
    )
  }
}