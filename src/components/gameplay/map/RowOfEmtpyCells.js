import React from 'react';
import { View } from 'react-native';

import { CellEmpty } from './CellEmpty';

export const RowOfEmptyCells = (props) => {
  let columns = [...Array(props.numOfColumns).keys()].map(col => {
    return <CellEmpty cellWidth={props.cellWidth} key={col}/>
  })

  return (
    <View style={{backgroundColor: 'Yellow', height: props.cellHeight, flexDirection: 'row', justifyContent: 'space-around'}}>
      {columns}
    </View>
  )
}
