import React from 'react';
import { StyleSheet, View } from 'react-native';

import { GameplayMain } from './gameplay2/GameplayMain';
import { LandingMain } from './landing-page/LandingMain';


export default class App extends React.Component {
  state = {
    playing: false,
    fadingOutGameplay: false
  }

  fadeOutGameplayTime = 600

  backToLanding = () => {
    this.setState({fadingOutGameplay: true}, () => {
      setTimeout(() => {
        this.setState({playing: false, fadingOutGameplay: false})
      }, this.fadeOutGameplayTime + 150)
    })
  }

  setToPlaying = () => {
    this.setState({playing: true})
  }

  render() {
    let component = this.state.playing ? 
      <GameplayMain 
        backToLanding={this.backToLanding} 
        fadeOutGameplayTime={this.fadeOutGameplayTime} 
        fadingOutGameplay={this.state.fadingOutGameplay}
      /> :
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
    paddingHorizontal: 10,
    backgroundColor: 'yellow'
  }
})
