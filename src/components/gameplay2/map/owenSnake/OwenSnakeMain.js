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


  async componentDidUpdate(prevProps, prevState){
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
        for (const [i, owenFace] of this.state.snakeBody.entries()) {
          this._goUp(i)
          await this.delayDirectionChange('up')
        }
      } else {
        for (const [i, owenFace] of this.state.snakeBody.entries()) {
          this._goDown(i)
          await this.delayDirectionChange('down')
        }
      }
    } 
    
    else {
      if (this.props.lastPressed.mapX < leadOwenCenterX) {
        for (const [i, owenFace] of this.state.snakeBody.entries()) {
          this._goLeft(i)
          await this.delayDirectionChange('left')
        }
      } else {
        for (const [i, owenFace] of this.state.snakeBody.entries()) {
          this._goRight(i)
          await this.delayDirectionChange('left')
        }
      }
    }
  }

  delayDirectionChange (direction) {
    const delayTimeMs = (direction === 'up' || direction === 'down') 
      // ? this.millisecondsPerPixel * this.props.cellDimensions.width - 20
      // : this.millisecondsPerPixel * this.props.cellDimensions.height - 10
      ? this.millisecondsPerPixel * this.props.cellDimensions.height
      : this.millisecondsPerPixel * this.props.cellDimensions.width
    return new Promise(resolve => setTimeout(resolve, delayTimeMs))
  }


  setNewDirection(direction, callback){
    const newSnakeBody = [...this.state.snakeBody]
    newSnakeBody[0].moving = direction
    this.setState({snakeBody: newSnakeBody}, callback)
  }


  _goRight(snakeBodyIndex){
    if (snakeBodyIndex > 0) {
      this.state.snakeBody[snakeBodyIndex].left.setValue(this.state.snakeBody[snakeBodyIndex - 1].left.__getValue() - this.props.cellDimensions.width)
    }
    const pxToGo = (this.props.mapDimensions.width - this.props.cellDimensions.width) - this.state.snakeBody[snakeBodyIndex].left.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].top.stopAnimation()

    if (snakeBodyIndex !== 0) {
      this.state.snakeBody[snakeBodyIndex].top.setValue(
        this.state.snakeBody[snakeBodyIndex - 1].top.__getValue()
      )
    }
    
    this.setNewDirection('right', () => {
      Animated.timing(this.state.snakeBody[snakeBodyIndex].left, {
        toValue: this.props.mapDimensions.width - this.props.cellDimensions.width,
        easing: Easing.linear,
        duration: timeBeforeWall
      }).start()
    })
  }


  _goLeft(snakeBodyIndex){
    if (snakeBodyIndex > 0) {
      this.state.snakeBody[snakeBodyIndex].left.setValue(this.state.snakeBody[snakeBodyIndex - 1].left.__getValue() + this.props.cellDimensions.width)
    }
    const pxToGo = this.state.snakeBody[snakeBodyIndex].left.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].top.stopAnimation()

    if (snakeBodyIndex !== 0) {
      this.state.snakeBody[snakeBodyIndex].top.setValue(
        this.state.snakeBody[snakeBodyIndex - 1].top.__getValue()
      )
    }

    this.setNewDirection('left', () => {
      Animated.timing(this.state.snakeBody[snakeBodyIndex].left, {
        toValue: 0,
        easing: Easing.linear,
        duration: timeBeforeWall
      }).start()      
    })
  }


  _goDown(snakeBodyIndex){
    if (snakeBodyIndex > 0) {
      this.state.snakeBody[snakeBodyIndex].top.setValue(this.state.snakeBody[snakeBodyIndex - 1].top.__getValue() - this.props.cellDimensions.height)
    }
    const pxToGo = (this.props.mapDimensions.height - this.props.cellDimensions.height) - this.state.snakeBody[snakeBodyIndex].top.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].left.stopAnimation()

    if (snakeBodyIndex !== 0) {
      this.state.snakeBody[snakeBodyIndex].left.setValue(
        this.state.snakeBody[snakeBodyIndex - 1].left.__getValue()
      )
    }

    this.setNewDirection('down', () => {
      Animated.timing(this.state.snakeBody[snakeBodyIndex].top, {
        toValue: this.props.mapDimensions.height - this.props.cellDimensions.height,
        easing: Easing.linear,
        duration: timeBeforeWall
      }).start()      
    })
  }


  _goUp(snakeBodyIndex){
    if (snakeBodyIndex > 0) {
      this.state.snakeBody[snakeBodyIndex].top.setValue(this.state.snakeBody[snakeBodyIndex - 1].top.__getValue() + this.props.cellDimensions.height)
    }
    const pxToGo = this.state.snakeBody[snakeBodyIndex].top.__getValue()
    const timeBeforeWall = this.millisecondsPerPixel * pxToGo
    this.state.snakeBody[snakeBodyIndex].left.stopAnimation()

    if (snakeBodyIndex !== 0) {
      this.state.snakeBody[snakeBodyIndex].left.setValue(
        this.state.snakeBody[snakeBodyIndex - 1].left.__getValue()
      )
    }

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