import React from 'react';
import { View } from 'react-native';

import { CellEmpty } from './CellEmpty';
import { BallToEatCell } from './BallToEatCell';

export const RowOfEmptyCells = (props) => {
  let columns = [...Array(props.numOfColumns).keys()].map(columnIndex => {
    if (props.ballToEat.rowIndex === props.rowIndex && props.ballToEat.columnIndex === columnIndex) {
      return <BallToEatCell cellWidth={props.cellWidth} key={columnIndex}/>
    } else {
      return <CellEmpty cellWidth={props.cellWidth} key={columnIndex}/>
    }
  })

  return (
    <View style={{backgroundColor: 'Yellow', height: props.cellHeight, flexDirection: 'row', justifyContent: 'space-around'}}>
      {columns}
    </View>
  )
}
