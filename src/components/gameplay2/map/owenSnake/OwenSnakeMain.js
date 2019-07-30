import React from 'react';

import { View, Animated, Easing } from 'react-native';
import { SingleOwenFace } from './SingleOwenFace';

import { 
  addListenersForChickenWing, 
  removeListenersForChicken, 
  _goUp, _goDown, _goLeft, _goRight, 
  owenEatsChicken, 
  setNewDirection,
  addOwenFace,
  beginFaceAnimation
} from './OwenSnakeMainUtils';

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
    this._goDown = _goDown.bind(this)
    this._goUp = _goUp.bind(this)
    this._goLeft = _goLeft.bind(this)
    this._goRight = _goRight.bind(this)
    this.owenEatsChicken = owenEatsChicken.bind(this)
    this.setNewDirection = setNewDirection.bind(this)
    this.addOwenFace = addOwenFace.bind(this)
    this.beginFaceAnimation = beginFaceAnimation.bind(this)
    this.millisecondsPerPixel = 4000 / this.props.mapDimensions.width
  }


  componentDidUpdate(prevProps, prevState){
    if (prevState.snakeBody.length !== this.state.snakeBody.length) {
      // A new snake face was added
      this.beginFaceAnimation(this.state.snakeBody.length - 1)
    }
    
    if (prevProps.lastPressed.numOfTouches === this.props.lastPressed.numOfTouches){
      // Used to break out of the Updated-State infinite loop
      return;
    }

    if (prevProps.chickenWing.left !== this.props.chickenWing.left) {
      // If chicken got eaten, change the Animation Listener on the first Owen Head
      this.removeListenersForChicken()
      this.addListenersForChickenWing()
      return;
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