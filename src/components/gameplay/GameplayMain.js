import React from 'react';
import { View } from 'react-native';

import { Header } from './map/Header';
import { MapMain } from './map/MapMain';

export class GameplayMain extends React.Component {
  state = {
    snakeBalls: [{x: 0, y:0}],
    cellDimensions: {width: null, height: null},
    currentDirection: 'right', //one of either: up, down, left, right
    ballToEat: {x: 0, y: 0},
    mapDimensions: {width: null, height: null}
  }


  setMapDimensions = (event) => {
    windowWidth = event.nativeEvent.layout.width
    windowHeight = event.nativeEvent.layout.height

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