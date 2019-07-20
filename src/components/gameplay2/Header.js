import React from 'react';

import { Text, View } from 'react-native';

export function Header (){
  return (
    <View style={HeaderStyles.view}>
      <Text style={HeaderStyles.text}>Header</Text>
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