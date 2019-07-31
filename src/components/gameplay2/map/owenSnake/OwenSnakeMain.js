import React from 'react';

import { View, Animated, Easing } from 'react-native';
import { SingleOwenFace } from './SingleOwenFace';

import { addListenersForChickenWing, removeListenersForChicken } from './OwenSnakeMainUtils';

export class OwenSnakeMain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      snakeBody: [
        {
          left: new Animated.Value(1),
          top: new Animated.Value(1),
          moving: 'right',
          listeners: {
            chickenWingLeftId: null,
            chickenWingLeftAligned: false,
            chickenWingTop: null,
            chickenWingTopAligned: false
          }
        }
      ]
    }
    this.addListenersForChickenWing = addListenersForChickenWing.bind(this)
    this.removeListenersForChicken = removeListenersForChicken.bind(this)
    this.millisecondsPerPixel = 4000 / this.props.mapDimensions.width
  }


  owenEatsChicken(){
    this.addOwenFace()
    this.removeListenersForChicken()
    this.props.playOwenSound()
    this.props.setChickenWing()
    this.addListenersForChickenWing()
    console.log('ATE IT! WOWWWW!')
  }


  componentDidUpdate(prevProps, prevState){
    if (prevProps.lastPressed.numOfTouches === this.props.lastPressed.numOfTouches){
      return;
    }

    if (prevProps.chickenWing.left !== this.props.chickenWing.left) {
      this.removeListenersForChicken()
      this.addListenersForChickenWing()
    }

    const leadOwenCenterX = this.state.snakeBody[0].left.__getValue() + (1 / 2 * this.props.cellDimensions.width)
    const leadOwenCenterY = this.state.snakeBody[0].top.__getValue() + (1 / 2 * this.props.cellDimensions.height)
    const currentDirection = this.state.snakeBody[0].moving

    if (currentDirection === 'right' || currentDirection === 'left') {
      if (this.props.lastPressed.mapY < leadOwenCenterY) {
        this._goUp(0)
      } else {
        this._goDown(0)
      }
    } 
    
    else {
      if (this.props.lastPressed.mapX < leadOwenCenterX) {
        this._goLeft(0)
      } else {
        this._goRight(0)
      }     
    }
  }


  setNewDirection(direction, callback){
    const newSnakeBody = [...this.state.snakeBody]
    newSnakeBody[0].moving = direction
    this.setState({snakeBody: newSnakeBody}, callback)
  }


  _goRight(snakeBodyIndex){
    const pxToGo = (this.props.mapDimensions.width - this.props.cellDimensions.width) - this.state.snakeBody[snakeBodyIndex].left.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].top.stopAnimation()
    
    this.setNewDirection('right', () => {
      Animated.timing(this.state.snakeBody[snakeBodyIndex].left, {
        toValue: this.props.mapDimensions.width - this.props.cellDimensions.width,
        easing: Easing.linear,
        duration: timeBeforeWall
      }).start()
    })
  }


  _goLeft(snakeBodyIndex){
    const pxToGo = this.state.snakeBody[snakeBodyIndex].left.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].top.stopAnimation()

    this.setNewDirection('left', () => {
      Animated.timing(this.state.snakeBody[snakeBodyIndex].left, {
        toValue: 0,
        easing: Easing.linear,
        duration: timeBeforeWall
      }).start()      
    })
  }


  _goDown(snakeBodyIndex){
    const pxToGo = (this.props.mapDimensions.height - this.props.cellDimensions.height) - this.state.snakeBody[snakeBodyIndex].top.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].left.stopAnimation()

    this.setNewDirection('down', () => {
      Animated.timing(this.state.snakeBody[snakeBodyIndex].top, {
        toValue: this.props.mapDimensions.height - this.props.cellDimensions.height,
        easing: Easing.linear,
        duration: timeBeforeWall
      }).start()      
    })
  }


  _goUp(snakeBodyIndex){
    const pxToGo = this.state.snakeBody[snakeBodyIndex].top.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].left.stopAnimation()

    this.setNewDirection('up', () => {
      Animated.timing(this.state.snakeBody[snakeBodyIndex].top, {
        toValue: 0,
        easing: Easing.linear,
        duration: timeBeforeWall
      }).start()      
    })
  }


  componentDidMount(){
    this._goRight(0)
    this.addListenersForChickenWing()
    this.state.snakeBody[0].left.addListener( ({value}) => {
      if (value === 0 || value === this.props.mapDimensions.width - this.props.cellDimensions.width) {
        console.log('DEAD! (SIDEWAYS)')
      }
    })
    this.state.snakeBody[0].top.addListener( ({value}) => {
      if (value === 0 || value === this.props.mapDimensions.height - this.props.cellDimensions.height) {
        console.log('DEAD! (VERTICALLY)')
      }
    })
  }


  addOwenFace(){
    const updatedSnakeBody = [...this.state.snakeBody]
    let newLeft = updatedSnakeBody[updatedSnakeBody.length - 1].left.__getValue()
    let newTop = updatedSnakeBody[updatedSnakeBody.length - 1].top.__getValue()
    switch (updatedSnakeBody[updatedSnakeBody.length - 1].moving) {
      case('up'):
        newTop += this.props.cellDimensions.height
        break
      case('down'):
        newTop -= this.props.cellDimensions.height
        break
      case('left'):
        newLeft += this.props.cellDimensions.width
        break
      case('right'):
        newLeft -= this.props.cellDimensions.width
        break
      default:
        console.log('Probably should error handle here in AddOwenFace method')
    }

    updatedSnakeBody.push({
      left: new Animated.Value(newLeft),
      top: new Animated.Value(newTop),
      moving: this.state.snakeBody[this.state.snakeBody.length - 1].moving
    })

    this.setState({snakeBody: updatedSnakeBody}, () => {
      switch(updatedSnakeBody[updatedSnakeBody.length - 1].moving){
        case('up'):
          this._goUp(updatedSnakeBody.length - 1)
          break
        case('down'):
          this._goDown(updatedSnakeBody.length - 1)
          break
        case('left'):
          this._goLeft(updatedSnakeBody.length - 1)
          break
        case('right'):
          this._goRight(updatedSnakeBody.length - 1)
          break
      }
    })
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