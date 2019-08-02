import React from 'react';

import { Text, View, TouchableHighlight } from 'react-native';

export function Header (props) {
  const HeaderStyles = {
    view: {
      flex: props.mapDimensions.headerHeight,
      backgroundColor: 'green'
    },
    text: {
      fontSize: 35
    }
  }

  return (
    <View style={HeaderStyles.view}>
      <Text style={HeaderStyles.text}>Header</Text>
      <TouchableHighlight onPress={event => props.backToLanding()}>
        <Text>Back to Landing</Text>
      </TouchableHighlight>
    </View>
  )
}