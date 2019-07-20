import React from 'react';

import { Text, View, TouchableHighlight } from 'react-native';

export function Header (props) {
  return (
    <View style={HeaderStyles.view}>
      <Text style={HeaderStyles.text}>Header</Text>
      <TouchableHighlight onPress={event => props.backToLanding()}>
        <Text>Back to Landing</Text>
      </TouchableHighlight>
    </View>
  )
}

const HeaderStyles = {
  view: {
    flex: 1,
    backgroundColor: 'green'
  },
  text: {
    fontSize: 35
  }
}