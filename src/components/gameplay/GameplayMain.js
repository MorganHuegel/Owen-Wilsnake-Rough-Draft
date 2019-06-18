import React from 'react';
import { View } from 'react-native';

import { Header } from './map/Header';
import { MapMain } from './map/MapMain';

export class GameplayMain extends React.Component {
  state = {
    snakeBalls: [{x: -10, y:0}],
    cellDimensions: {width: null, height: null},
    currentDirection: 'right', //one of either: up, down, left, right
    ballToEat: {x: 0, y: 0},
    mapDimensions: {width: null, height: null}
  }

  componentDidMount(){
    this.moveInterval = setInterval(this.moveOwen, 500)
    this.moveInterval
  }

  componentWillUnmount(){
    clearInterval(this.moveInterval)
  }


  moveOwen = () => {
    let nextCoordinate = {x: 0, y: 0}
    let nextDirection = this.state.currentDirection

    switch(this.state.currentDirection){
      case('up'):
        nextCoordinate.x = this.state.snakeBalls[0].x
        nextCoordinate.y = this.state.snakeBalls[0].y - this.state.cellDimensions.height
        if (nextCoordinate.y < 0) {
          nextCoordinate.y = this.state.cellHeight
          nextDirection = 'down'
        }
        break;
      case('down'):
        nextCoordinate.x = this.state.snakeBalls[0].x
        nextCoordinate.y = this.state.snakeBalls[0].y + this.state.cellDimensions.height
        if (nextCoordinate.y > this.state.mapDimensions.height - this.state.cellDimensions.height) {
          nextCoordinate.y = this.state.mapDimensions.height - 2 * this.state.cellDimensions.height
          nextDirection = 'up'
        }
        break;
      case('right'):
        nextCoordinate.x = this.state.snakeBalls[0].x + this.state.cellDimensions.width
        nextCoordinate.y = this.state.snakeBalls[0].y
        if (nextCoordinate.x > this.state.mapDimensions.width - this.state.cellDimensions.width - 20) {
          nextCoordinate.x = this.state.mapDimensions.width - this.state.cellDimensions.width - 10
          nextDirection = 'left'
        }
        break;
      case('left'):
        nextCoordinate.x = this.state.snakeBalls[0].x - this.state.cellDimensions.width
        nextCoordinate.y = this.state.snakeBalls[0].y
        if (nextCoordinate.x < 0) {
          nextCoordinate.x = -10
          nextDirection = 'right'
        }
        break;    
      default:
        break;
    }

    updatedSnakeBalls = [nextCoordinate, ...this.state.snakeBalls]
    updatedSnakeBalls.pop()
    this.setState({
      snakeBalls: updatedSnakeBalls,
      currentDirection: nextDirection
    })
  }


  setMapDimensions = (event) => {
    windowWidth = event.nativeEvent.layout.width - 10
    windowHeight = event.nativeEvent.layout.height - 10

    let numOfColumns = Math.floor(windowWidth / 30)
    let numOfRows = Math.floor(windowHeight / 30)
    cellWidth = windowWidth / numOfColumns
    cellHeight = windowHeight / numOfRows

    this.setState({
      cellDimensions: {
        width: cellWidth,
        height: cellHeight
      },
      mapDimensions: {
        width: windowWidth,
        height: windowHeight
      }
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Header
          styleSheet={styles.header} 
          backToLanding={this.props.backToLanding}
        />
        <MapMain 
          cellDimensions={this.state.cellDimensions}
          styleSheet={styles.mapMain} 
          mapDimensions={this.state.mapDimensions} 
          setMapDimensions={this.setMapDimensions} 
          snakeBalls={this.state.snakeBalls}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: 'rgb(120, 120, 120)'
  },
  header: {
    flex: 1,
    backgroundColor: 'black'
  },
  mapMain: {
    flex: 8,
    backgroundColor: 'rgb(70, 70, 70)'
  }
}