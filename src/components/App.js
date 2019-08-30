import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { LoginMain } from './login/loginMain';
import { GameplayMain } from './gameplay/GameplayMain';
import { LandingMain } from './landing-page/LandingMain';
import { fetchLoginJwt } from '../fetchFunctions/loginJwt';


export default class App extends React.Component {
  state = {
    loggedIn: false,
    playing: false,
    fadingOutGameplay: false,
    isFetching: false
  }


  fadeOutGameplayTime = 600

  backToLanding = () => {
    this.setState({fadingOutGameplay: true}, () => {
      setTimeout(() => {
        this.setState({playing: false, fadingOutGameplay: false})
      }, this.fadeOutGameplayTime + 150)
    })
  }


  componentWillMount(){
    this.setState({isFetching: true}, () => {
      return AsyncStorage.getItem('@webToken')
        .then(webToken => {
          if (!webToken) {
            return Promise.reject('No JWT stored :(')
          }
          return fetchLoginJwt(webToken)
        })
        .then(isValid => {
          if (isValid) {
            this.setState({loggedIn: true, isFetching: false})
          } else {
            this.setState({loggedIn: false, isFetching: false})
          }
        })
        .catch((err) => {
          this.setState({loggedIn: false, isFetching: false})
        })
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
    if (this.state.isFetching) {
      component = <ActivityIndicator 
        size='large' 
        color='rgb(255, 255, 255)' 
        animating={this.state.isFetching} 
        style={{marginTop: 100}}
      />
    } else if (!this.state.loggedIn) {
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
