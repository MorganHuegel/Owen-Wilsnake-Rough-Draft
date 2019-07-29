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
}