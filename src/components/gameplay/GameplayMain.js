import React from 'react';
import { View } from 'react-native';

import { Header } from './map/Header';
import { MapMain } from './map/MapMain';

export class GameplayMain extends React.Component {
  state = {
    snakeBalls: [{x: 0, y:0}],
    currentDirection: 'right', //one of either: up, down, left, right
    ballToEat: {x: 0, y: 0},
    mapDimensions: {width: null, height: null}
  }

  setMapDimensions = (event) => {
    this.setState({
      mapDimensions: {
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height
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