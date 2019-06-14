import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GameplayMain } from './gameplay/GameplayMain';
import { LandingMain } from './landing-page/LandingMain';


export default class App extends React.Component {
  state = {
    playing: false
  }

  backToLanding = () => {
    this.setState({playing: false})
  }

  setToPlaying = () => {
    this.setState({playing: true})
  }

  render() {
    let component = this.state.playing ? 
      <GameplayMain backToLanding={this.backToLanding}/> :
      <LandingMain setToPlaying={this.setToPlaying}/>

    return (
      <View>
        {component}
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
