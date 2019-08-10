import React from 'react';

import { View, Button } from 'react-native';

export function StartButton (props) {
  const startButtonStyles = {
    container: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {}
  }
  return (
    <View style={startButtonStyles.container}>
      <Button onPress={props.setToPlaying} title="Start Playing" style={startButtonStyles.button}/>
    </View>
  )
}