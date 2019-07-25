import React from 'react';

import { View, Text } from 'react-native';

export function SingleCell (props) {
  return (
    <View style={props.singleStylesheet}>
      <View style={{
        width: 5, 
        height: 5, 
        backgroundColor: 'rgb(230, 230, 255)',
        borderRadius: 50
        }}>
        </View>
    </View>
  )
}