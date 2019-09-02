import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { LoginPasswordOnlyMain } from './login/loginPasswordOnlyMain';
import { RegisterMain } from './login/registerMain';
import { GameplayMain } from './gameplay/GameplayMain';
import { LandingMain } from './landing-page/LandingMain';
import { fetchLoginJwt } from '../fetchFunctions/loginJwt';
import { checkPhoneId } from '../fetchFunctions/checkPhoneId';


export default class App extends React.Component {
  state = {
    showRegistration: false,
    showPasswordLogin: false,
    loggedIn: false,
    playing: false,
    fadingOutGameplay: false,
    isFetching: false
  }


  fadeOutGameplayTime = 600

  backToLanding = () => {
    this.setState({fadingOutGameplay: true}, () => {
      setTimeout(() => {
        this.setState({
          showRegistration: false,
          showPasswordLogin: false,
          playing: false, 
          fadingOutGameplay: false
        })
      }, this.fadeOutGameplayTime + 150)
    })
  }


  componentWillMount(){
    // If JWT, just log user in automatically
    // If no JWT, but phoneId is in database, just have uesr enter password
    // If no JWT and phoneId not in database, have uesr register
    this.setState({isFetching: true}, () => {
      return AsyncStorage.getItem('@webToken')
        .then(webToken => {
          if (!webToken) {
            return Promise.reject('No JWT')
          }
          return fetchLoginJwt(webToken)
        })
        .then(isValid => {
          if (isValid) {
            this.setState({loggedIn: true, showPasswordLogin: false, isFetching: false})
          } else {
            this.setState({loggedIn: false, showPasswordLogin: true, isFetching: false})
          }
        })
        .catch((err) => {
          if (err === 'No JWT') {
            return checkPhoneId()
              .then(userExists => {
                if (userExists) {
                  this.setState({
                    showRegistration: false,
                    showPasswordLogin: true,
                    loggedIn: false,
                    isFetching: false
                  })
                } else {
                  this.setState({
                    showRegistration: true,
                    showPasswordLogin: false,
                    loggedIn: false,
                    isFetching: false
                  })
                }
              })
              .catch(err => {
                console.log('Should error handle here in checkPhoneId: ', err)
              })
          }
          else this.setState({
            loggedIn: false, 
            showPasswordLogin: true, 
            showRegistration: false, 
            isFetching: false
          })
        })
    })
  }


  setLoggedIn = (bool, webToken=null) => {
    if (bool) {
      return AsyncStorage.setItem('@webToken', webToken)
        .then(this.setState({
          showRegistration: false,
          showPasswordLogin: false,
          loggedIn: bool
        }))
    } else {
      return AsyncStorage.removeItem('@webToken')
        .then(this.setState({
          loggedIn: bool,
          playing: false,
          showPasswordLogin: true
        }))
    }
  }


  setToPlaying = () => {
    this.setState({
      playing: true,
      showRegistration: false,
      showPasswordLogin: false
    })
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
    } else if (!this.state.loggedIn && this.state.showRegistration) {
      component = <RegisterMain setLoggedIn={this.setLoggedIn}/>
    } else if (!this.state.loggedIn && this.state.showPasswordLogin) {
      component = <LoginPasswordOnlyMain setLoggedIn={this.setLoggedIn}/>
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
