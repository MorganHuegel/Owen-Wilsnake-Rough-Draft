import React from 'react';
import { Text, View } from 'react-native';

let cellWidth;

export const CellEmpty = (props) => {

  cellWidth = props.cellWidth
  return (
    <View style={styles.cell}>
      <View style={styles.dot}></View>
    </View>
  )
}

styles = {
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
