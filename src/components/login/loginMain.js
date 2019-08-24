import React from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LoginInput } from './loginInput';

export class LoginMain extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      usernameText: '',
      usernameErrorMessage: '',
      verifiedUsernameAvailable: false,
      passwordText: 'password',
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
      width: 120,
      height: 140
    },
    button: {
      width: 250,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderRadius: 5,
      borderColor: 'rgb(230, 230, 230)'
    },
    buttonText: {},
    errorMessage: {
      color: 'rgb(255, 170, 160)',
      fontStyle: 'italic',
      marginBottom: 50,
      minHeight: 40,
      maxWidth: 250
    }
  }

  onChangeUsernameText = (text) => {
    let usernameErrorMessage = ''
    if (!text) {
      usernameErrorMessage = 'Username is needed to show off your high scores!'
    }
    return this.setState({
      usernameText: text, 
      usernameErrorMessage
    })
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


  onBlurUsername = (event) => {
    //CHECK AVAILABILITY HERE
  }

  onBlurPassword = (event) => {

  }





  render(){
    let editable = !this.state.isFetching

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
            isUsername={true}
            onChange={this.onChangeUsernameText}
            errorMessage={this.state.usernameErrorMessage}
            isFetching={this.state.isFetching}
            onBlur={this.onBlurUsername}
          />

          <LoginInput 
            isUsername={false}
            onChange={this.onChangePasswordText}
            errorMessage={this.state.passwordErrorMessage}
            isFetching={this.state.isFetching}
            onBlur={this.onBlurPassword}
          />

          <TouchableOpacity style={this.loginMainStyles.button}>
            <Text style={this.loginMainStyles.buttonText}>Start Playing</Text>
          </TouchableOpacity>

          <Text style={this.loginMainStyles.errorMessage}>{this.state.fetchErrorMessage}</Text>
        </View>


      </View>
    )
  }
}