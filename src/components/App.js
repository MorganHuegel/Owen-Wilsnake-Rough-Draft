import React from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { LoginMain } from './login/loginMain';
import { GameplayMain } from './gameplay/GameplayMain';
import { LandingMain } from './landing-page/LandingMain';


export default class App extends React.Component {
  state = {
    loggedIn: false,
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

  setLoggedIn = (bool, webToken=null) => {
    if (bool) {
      return AsyncStorage.setItem('@webToken', webToken)
        .then(this.setState({
          loggedIn: bool
        }))
    } else {
      return AsyncStorage.removeItem('@webToken')
        .then(this.setState({
          loggedIn: bool
        }))
    }
  }

  setToPlaying = () => {
    this.setState({playing: true})
  }

  render() {
    let component;
    if (!this.state.loggedIn) {
      component = <LoginMain setLoggedIn={this.setLoggedIn}/>
    } else if (this.state.playing) {
      component = <GameplayMain 
        backToLanding={this.backToLanding} 
        fadeOutGameplayTime={this.fadeOutGameplayTime} 
        fadingOutGameplay={this.state.fadingOutGameplay}
        screenPaddingX={stylesApp.container.paddingHorizontal}
        screenPaddingY={stylesApp.container.paddingVertical}
      /> 
    } else {
      component = <LandingMain setToPlaying={this.setToPlaying} setLoggedIn={this.setLoggedIn}/>
    } 

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
    backgroundColor: 'rgb(99,116,122)'
  }
})
