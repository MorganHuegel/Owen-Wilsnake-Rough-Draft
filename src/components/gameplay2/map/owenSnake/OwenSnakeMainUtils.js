import { Animated, Easing } from 'react-native';


export function addListenersForChickenWing () {
  const listenerLeft = this.state.snakeBody[0].left.addListener( ({value}) => {
    const alignedHorizontally = Math.abs(value - this.props.chickenWing.left) < (this.props.cellDimensions.width)
    const alignedVertically = this.state.snakeBody[0].listeners.chickenWingTopAligned

    // If it is aligned both vertically and horizontally
    if (alignedHorizontally && alignedVertically) {
      this.owenEatsChicken()
    } // If it is aligned only horizontally only, and state has not been updated to show it yet
    else if (alignedHorizontally && !this.state.snakeBody[0].listeners.chickenWingLeftAligned) {
      const updatedListeners = Object.assign({}, this.state.snakeBody[0].listeners, {chickenWingLeftAligned: true})
      const updatedSnakeBody = [...this.state.snakeBody]
      updatedSnakeBody[0].listeners = updatedListeners
      this.setState({snakeBody: updatedSnakeBody})
    } // If it is not aligned horizontally, but state says that it is, we need to change the state back
    else if (!alignedHorizontally && this.state.snakeBody[0].listeners.chickenWingLeftAligned) {
      const updatedListeners = Object.assign({}, this.state.snakeBody[0].listeners, {chickenWingLeftAligned: false})
      const updatedSnakeBody = [...this.state.snakeBody]
      updatedSnakeBody[0].listeners = updatedListeners
      this.setState({snakeBody: updatedSnakeBody})
    } 
    // No Else case, because if it is not aligned and state does not say it is aligned, no change needs to be made
  })


  const listenerTop = this.state.snakeBody[0].top.addListener( ({value}) => {
    const alignedHorizontally = this.state.snakeBody[0].listeners.chickenWingLeftAligned
    const alignedVertically = Math.abs(value - this.props.chickenWing.top) < (this.props.cellDimensions.height)

    // If it is aligned both vertically and horizontally
    if (alignedHorizontally && alignedVertically) {
      this.owenEatsChicken()
    } // If it is aligned only vertically only, and state has not been updated to show it yet
    else if (alignedVertically && !this.state.snakeBody[0].listeners.chickenWingTopAligned) {
      const updatedListeners = Object.assign({}, this.state.snakeBody[0].listeners, {chickenWingTopAligned: true})
      const updatedSnakeBody = [...this.state.snakeBody]
      updatedSnakeBody[0].listeners = updatedListeners
      this.setState({snakeBody: updatedSnakeBody})
    } // If it is not aligned vertically, but state says that it is, we need to change the state back
    else if (!alignedVertically && this.state.snakeBody[0].listeners.chickenWingTopAligned) {
      const updatedListeners = Object.assign({}, this.state.snakeBody[0].listeners, {chickenWingTopAligned: false})
      const updatedSnakeBody = [...this.state.snakeBody]
      updatedSnakeBody[0].listeners = updatedListeners
      this.setState({snakeBody: updatedSnakeBody})
    } 
    // No Else case, because if it is not aligned and state does not say it is aligned, no change needs to be made
  })

  const updatedListeners = Object.assign({}, this.state.snakeBody[0].listeners, {
    chickenWingLeftId: listenerLeft,
    chickenWingTopId: listenerTop
  })
  const updatedSnakeBody = [...this.state.snakeBody]
  updatedSnakeBody[0].listeners = updatedListeners
  this.setState({snakeBody: updatedSnakeBody})
}


export function removeListenersForChicken () {
  this.state.snakeBody[0].left.removeListener(this.state.snakeBody[0].listeners.chickenWingLeftId)
  this.state.snakeBody[0].top.removeListener(this.state.snakeBody[0].listeners.chickenWingTopId)
  const updatedListeners = Object.assign({}, this.state.snakeBody[0].listerners, {
    chickenWingLeftId: null,
    chickenWingLeftAligned: false,
    chickenWingTop: null,
    chickenWingTopAligned: false
  })
  const updatedSnakeBody = [...this.state.snakeBody]
  updatedSnakeBody[0].listeners = updatedListeners
  this.setState({snakeBody: updatedSnakeBody})
}


export function _goRight(snakeBodyIndex){
  console.log('changing direction of snake: ', snakeBodyIndex)
  const pxToGo = (this.props.mapDimensions.width - this.props.cellDimensions.width) - this.state.snakeBody[snakeBodyIndex].left.__getValue()
  const timeBeforeWall = this.millisecondsPerPixel * pxToGo
  this.state.snakeBody[snakeBodyIndex].top.stopAnimation()
  
  this.setNewDirection('right', () => {
    Animated.timing(this.state.snakeBody[snakeBodyIndex].left, {
      toValue: this.props.mapDimensions.width - this.props.cellDimensions.width,
      easing: Easing.linear,
      duration: timeBeforeWall
    }).start()
    if (snakeBodyIndex !== this.state.snakeBody.length - 1) {
      setTimeout(() => this._goRight(snakeBodyIndex + 1), this.millisecondsPerPixel * this.props.cellDimensions.width)
    }
  })
}


export function _goLeft(snakeBodyIndex){
  console.log('changing direction of snake: ', snakeBodyIndex)
  const pxToGo = this.state.snakeBody[snakeBodyIndex].left.__getValue()
  const timeBeforeWall = this.millisecondsPerPixel * pxToGo
  this.state.snakeBody[snakeBodyIndex].top.stopAnimation()

  this.setNewDirection('left', () => {
    Animated.timing(this.state.snakeBody[snakeBodyIndex].left, {
      toValue: 0,
      easing: Easing.linear,
      duration: timeBeforeWall
    }).start()
    if (snakeBodyIndex !== this.state.snakeBody.length - 1) {
      setTimeout(() => this._goLeft(snakeBodyIndex + 1), this.millisecondsPerPixel * this.props.cellDimensions.width)
    }  
  })
}


export function _goDown(snakeBodyIndex){
  console.log('changing direction of snake: ', snakeBodyIndex)
  const pxToGo = (this.props.mapDimensions.height - this.props.cellDimensions.height) - this.state.snakeBody[snakeBodyIndex].top.__getValue()
  const timeBeforeWall = this.millisecondsPerPixel * pxToGo
  this.state.snakeBody[snakeBodyIndex].left.stopAnimation()

  this.setNewDirection('down', () => {
    Animated.timing(this.state.snakeBody[snakeBodyIndex].top, {
      toValue: this.props.mapDimensions.height - this.props.cellDimensions.height,
      easing: Easing.linear,
      duration: timeBeforeWall
    }).start()
    if (snakeBodyIndex !== this.state.snakeBody.length - 1) {
      setTimeout(() => this._goDown(snakeBodyIndex + 1), this.millisecondsPerPixel * this.props.cellDimensions.height)
    }
  })
}


export function _goUp(snakeBodyIndex){
  console.log('changing direction of snake: ', snakeBodyIndex)
  const pxToGo = this.state.snakeBody[snakeBodyIndex].top.__getValue()
  const timeBeforeWall = this.millisecondsPerPixel * pxToGo
  this.state.snakeBody[snakeBodyIndex].left.stopAnimation()

  this.setNewDirection('up', () => {
    Animated.timing(this.state.snakeBody[snakeBodyIndex].top, {
      toValue: 0,
      easing: Easing.linear,
      duration: timeBeforeWall
    }).start()
    if (snakeBodyIndex !== this.state.snakeBody.length - 1) {
      setTimeout(() => this._goUp(snakeBodyIndex + 1), this.millisecondsPerPixel * this.props.cellDimensions.height)
    } 
  })
}

export function owenEatsChicken(){
  this.removeListenersForChicken()
  this.props.playOwenSound()
  this.props.setChickenWing()
  this.addListenersForChickenWing()
  this.addOwenFace()
  console.log('ATE IT! WOWWWW!')
}

export function setNewDirection(direction, callback, faceIndex = 0){
  const newSnakeBody = [...this.state.snakeBody]
  newSnakeBody[faceIndex].moving = direction
  this.setState({snakeBody: newSnakeBody}, callback)
}

export function addOwenFace(){
  const currentNumberOfOwens = this.state.snakeBody.length
  const lastOwenFace = this.state.snakeBody[currentNumberOfOwens - 1]

  const updatedSnakeBody = [...this.state.snakeBody]
  let newLeft = new Animated.Value(lastOwenFace.left.__getValue())
  let newTop = new Animated.Value(lastOwenFace.top.__getValue())
  switch(lastOwenFace.moving){
    case('right'):
      newLeft = new Animated.Value(lastOwenFace.left.__getValue() - this.props.cellDimensions.width)
      break
    case('left'):
      newLeft = new Animated.Value(lastOwenFace.left.__getValue() + this.props.cellDimensions.width)
      break
    case('down'):
      newTop = new Animated.Value(lastOwenFace.top.__getValue() - this.props.cellDimensions.height)
      break
    case('up'):
      newTop = new Animated.Value(lastOwenFace.top.__getValue() + this.props.cellDimensions.height)
      break
    default:
      console.log('Handle this error; last owen face did not have a direction assigned to `moving`')
  }

  updatedSnakeBody.push({
    left: newLeft,
    top: newTop,
    moving: this.state.snakeBody[currentNumberOfOwens - 1].moving
  })

  this.setState({snakeBody: updatedSnakeBody})
}


export function beginFaceAnimation(faceIndex){
  console.log('FACE INDEX: ', faceIndex)
  const faceToMove = this.state.snakeBody[faceIndex]
  switch (faceToMove.moving) {
    case('right'):
      this._goRight(faceIndex)
      break;
    case('left'):
      this._goLeft(faceIndex)
      break;
    case('up'):
      this._goUp(faceIndex)
      break;
    case('down'):
      this._goDown(faceIndex)
      break;
    default:
      console.log(`Handle this error; Owen Face at index ${faceIndex} doesnt have a direction assigned to 'moving'`)
  }
}