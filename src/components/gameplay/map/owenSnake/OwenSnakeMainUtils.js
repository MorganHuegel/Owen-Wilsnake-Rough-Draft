
export function checkForDeath(){
  // if lead Owen hits the wall, DEAD!!
  if (
    this.state.snakeBody[0].left.__getValue() === 0 || 
    this.state.snakeBody[0].top.__getValue() === 0 ||
    this.state.snakeBody[0].left.__getValue() === this.props.mapDimensions.width - this.props.cellDimensions.width ||
    this.state.snakeBody[0].top.__getValue() === this.props.mapDimensions.height - this.props.cellDimensions.height
    ) {
    this.owenDies()
  }

  // if lead Owen hits another owen, while traveling perpindicularly to that Owen, DEAD!!
  else if (this.state.snakeBody.find( (face, i) => {
    return (i > 3) &&
      ( Math.abs(this.state.snakeBody[0].left.__getValue() - face.left.__getValue()) < this.props.cellDimensions.width ) &&
      ( Math.abs(this.state.snakeBody[0].top.__getValue() - face.top.__getValue()) < this.props.cellDimensions.height ) &&
      ( 
        (this.state.snakeBody[0].moving === 'left'  || this.state.snakeBody[0].moving === 'right') ? 
        (face.moving === 'up' || face.moving === 'down') : 
        (face.moving === 'left' || face.moving === 'right')
      )
  })) {
    this.owenDies()
  }
}

export function checkForChicken(){
  if (
    (Math.abs(this.state.snakeBody[0].left.__getValue() - this.props.chickenWing.left) < this.props.cellDimensions.width)
    && (Math.abs(this.state.snakeBody[0].top.__getValue() - this.props.chickenWing.top) < this.props.cellDimensions.height)
  ) {
    this.owenEatsChicken()
  }
}
