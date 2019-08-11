import React from 'react';

import { Text, TouchableHighlight } from 'react-native';

export function BackToLandingButton (props) {
  const backToLandingButtonStyles = {
    touchable: {
      flex: 1,
      paddingTop: 20,
      alignItems: 'center'
    },
    text: {
      
    }
  }

  return (
    <TouchableHighlight onPress={event => props.backToLanding()} style={backToLandingButtonStyles.touchable}>
      <Text style={backToLandingButtonStyles.text}>Back to Landing</Text>
    </TouchableHighlight>
  )
}