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
  }


  async componentDidUpdate(prevProps, prevState){
    if (prevProps.chickenWing.left !== this.props.chickenWing.left) {
      this.removeListenersForChicken()
      this.addListenersForChickenWing()
    }

    if (prevProps.lastPressed.numOfTouches === this.props.lastPressed.numOfTouches){
      return;
    }

    const leadOwenCenterX = this.state.snakeBody[0].left.__getValue() + (1 / 2 * this.props.cellDimensions.width)
    const leadOwenCenterY = this.state.snakeBody[0].top.__getValue() + (1 / 2 * this.props.cellDimensions.height)
    const currentDirection = this.state.snakeBody[0].moving

    if (currentDirection === 'right' || currentDirection === 'left') {
      if (this.props.lastPressed.mapY < leadOwenCenterY) {
        for (const i of [...Array(1000).keys()]) {
          try {
            this.validateSnakeBodyIndex(i)
            this._goUp(i)
            await this.delayDirectionChange('up')
          } catch (e) {
            break;
          }
        }
      } else {
        for (const i of [...Array(1000).keys()]) {
          try {
            this.validateSnakeBodyIndex(i)
            this._goDown(i)
            await this.delayDirectionChange('down')
          } catch (e) {
            break;
          }
        }
      }
    } 
    
    else {
      if (this.props.lastPressed.mapX < leadOwenCenterX) {
        for (const i of [...Array(1000).keys()]) {
          try {
            this.validateSnakeBodyIndex(i)
            this._goLeft(i)
            await this.delayDirectionChange('left')
          } catch (e) {
            break;
          }
        }
      } else {
        for (const i of [...Array(1000).keys()]) {
          try {
            this.validateSnakeBodyIndex(i)
            this._goRight(i)
            await this.delayDirectionChange('right')
          } catch (e) {
            break;
          }
        }
      }
    }
  }

  validateSnakeBodyIndex(index){
    if (index >= this.state.snakeBody.length) {
      throw new Error('Break out of this loop')
    }
  }

  delayDirectionChange (direction) {
    const delayTimeMs = (direction === 'up' || direction === 'down') 
      ? this.millisecondsPerPixel * this.props.cellDimensions.height - 7
      : this.millisecondsPerPixel * this.props.cellDimensions.width - 7

    return new Promise(resolve => setTimeout(resolve, delayTimeMs))
  }


  setNewDirection(direction, snakeIndex, callback){
    const newSnakeBody = [...this.state.snakeBody]
    newSnakeBody[snakeIndex].moving = direction
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
    
    this.setNewDirection('right', snakeBodyIndex, () => {
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

    this.setNewDirection('left', snakeBodyIndex, () => {
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

    this.setNewDirection('down', snakeBodyIndex, () => {
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

    this.setNewDirection('up', snakeBodyIndex, () => {
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