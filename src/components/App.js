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
      <View style={stylesApp.container}>
        {component}
      </View>
    )
  }
}

const stylesApp = StyleSheet.create({
  container: { 
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingVertical: 40,
    paddingHorizontal: 15,
    backgroundColor: 'yellow'
  }
})
