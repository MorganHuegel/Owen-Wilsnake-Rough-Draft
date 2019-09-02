import React from 'react';

import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { LoginInput } from './loginInput';

import { fetchLogin } from '../../fetchFunctions/login';

export class LoginPasswordOnlyMain extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      passwordText: '',
      passwordErrorMessage: '',
      isFetching: false,
      fetchErrorMessage: ''
    }
  }

  loginMainStyles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
      width: 180,
      height: 210
    },
    button: {
      width: 250,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderRadius: 5,
      borderColor: 'rgb(230, 230, 230)',
      marginTop: 20
    },
    buttonText: {
      color: 'white'
    },
    errorMessage: {
      color: 'rgb(255, 170, 160)',
      fontStyle: 'italic',
      minHeight: 40,
      maxWidth: 250,
      marginTop: 10
    }
  }



  onChangePasswordText = (text) => {
    let passwordErrorMessage = ''
    if (!text) {
      passwordErrorMessage = 'Password required.'
    } else if (text.length < 8) {
      passwordErrorMessage = 'Password must be at least 8 characters long.'
    } else if (text.length > 30) {
      passwordErrorMessage = 'Password must be less than 30 characters long'
    }

    return this.setState({
      passwordText: text, 
      passwordErrorMessage
    })
  }



  onBlurPassword = (event) => {
    this.onChangePasswordText(event.nativeEvent.text)
  }



  onSubmit = (event) => {
    if (this.state.passwordErrorMessage) {
      return
    }
    if (!this.state.passwordText) {
      return this.setState({passwordErrorMessage: 'Whoa, hold up! Enter a password, first.'})
    }

    this.setState({
      isFetching: true,
      fetchErrorMessage: ''
    }, () => {
      return fetchLogin(null, this.state.passwordText)
        .then(webToken => {
          return this.props.setLoggedIn(true, webToken)
        })
        .catch(errorMessage => {
          // errorMessage should be a string, but it might be an Error object
          this.setState({
            fetchErrorMessage: errorMessage.message ? errorMessage.message : errorMessage,
            isFetching: false
          })
        })
    })
  }



  render(){
    return (
      <View style={this.loginMainStyles.container}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image 
            style={this.loginMainStyles.logo}
            source={require('../../../src/components/landing-page/logo/owen-face-with-border.png')}
          />
        </View>

        <View style={{flex: 1}}>

          <LoginInput 
            isUsername={false}
            onChange={this.onChangePasswordText}
            errorMessage={this.state.passwordErrorMessage}
            isFetching={this.state.isFetching}
            onBlur={this.onBlurPassword}
            inputValue={this.state.passwordText}
          />

          <TouchableOpacity 
            style={this.loginMainStyles.button} 
            disabled={this.state.isFetching || !!this.state.usernameErrorMessage || !!this.state.passwordErrorMessage} 
            onPress={this.onSubmit}
          >
            <Text style={this.loginMainStyles.buttonText}>Start Playing</Text>
          </TouchableOpacity>

          <Text style={this.loginMainStyles.errorMessage}>{this.state.fetchErrorMessage}</Text>

          <ActivityIndicator size='small' color='rgb(255, 255, 255)' animating={this.state.isFetching}/>
        </View>


      </View>
    )
  }
}