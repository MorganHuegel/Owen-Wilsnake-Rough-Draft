import React from 'react';

import { Text, TextInput, View } from 'react-native';

export function LoginInput (props) {
  const loginInputStyles = {
    conatiner: {
      width: 250,
      justifyContent: 'center',
      alignItems: 'center'
    },
    labels: {
      fontSize: 18,
      color: 'white',
    },
    textInput: {
      borderWidth: 1,
      borderColor: 'rgb(170, 170, 170)',
      width: 250,
      padding: 10,
      fontSize: 22,
      color: 'white',
      backgroundColor: 'rgb(165, 165, 165)'
    },
    errorMessage: {
      color: 'rgb(255, 170, 160)',
      fontStyle: 'italic',
      minHeight: 40,
      maxWidth: 250
    },
  }

  const errorInputStyles = props.errorMessage ? {
    backgroundColor: 'rgb(255, 170, 160)'
  } : null

  const emptyInputStyles = props.value ? null : {
    fontStyle: 'italic',
    color: 'rgb(220, 220, 220)'
  }

  return (
    <View style={loginInputStyles.container}>

      <TextInput 
        style={[loginInputStyles.textInput, emptyInputStyles, errorInputStyles]}
        onChangeText={props.onChange}
        defaultValue={props.isUsername ? 'username' : 'password'}
        autoCapitalize='none'
        autoCompleteType={props.isUsername ? 'username' : 'password'}
        autoCorrect={false}
        editable={!props.isFetching} // false if fetching
        onBlur={props.onBlur}
      />

      <Text style={loginInputStyles.errorMessage}>
        {props.errorMessage}
      </Text>
    </View>
  )
}