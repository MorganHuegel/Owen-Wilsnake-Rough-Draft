import React from 'react';
import { View } from 'react-native';

import { Header } from './map/Header';
import { MapMain } from './map/MapMain';

export class GameplayMain extends React.Component {
  state = {
    snakeBalls: [],
    currentDirection: 'up', //one of either: up, down, left, right
    ballToEat: {x: 0, y: 0}
  }

  render(){
    return (
      <View style={styles.container}>
        <Header styleSheet={styles.header} backToLanding={this.props.backToLanding}/>
        <MapMain styleSheet={styles.mapMain}/>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    borderWidth: 5,
    borderStyle: 'dashed',
    borderColor: 'rgb(120, 120, 120)'
  },
  header: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white'
  },
  mapMain: {
    flex: 6,
    backgroundColor: 'red',
    color: 'white'
  }
}