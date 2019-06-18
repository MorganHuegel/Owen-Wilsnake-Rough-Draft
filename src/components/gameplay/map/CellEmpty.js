import React from 'react';
import { View } from 'react-native';

export const CellEmpty = (props) => {
  return (
    <View style={stylesCellEmpty.cell}>
      <View style={stylesCellEmpty.dot}></View>
    </View>
  )
}

stylesCellEmpty = {
  cell: {
    borderRadius: 80,
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 80,
    backgroundColor: 'white'
  }
}
