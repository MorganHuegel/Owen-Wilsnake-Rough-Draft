import React from 'react';

import { Text } from 'react-native';

export function SingleCell (props) {
  console.log(props)
  return (
    <Text style={props.singleStylesheet}>1</Text>
  )
}