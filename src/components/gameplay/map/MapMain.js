import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { RowOfEmptyCells } from './RowOfEmtpyCells';

export const MapMain = (props) => {
  function onPressIn(event){
    const xFromTop = event.nativeEvent.locationX;
    const yFromTop = event.nativeEvent.locationY;
    console.log(xFromTop, yFromTop)
    console.log(event)
  }

  let rows;

  if (props.mapDimensions) {
    let numOfColumns = Math.floor(props.mapDimensions.width / 30)
    let numOfRows = Math.floor(props.mapDimensions.height / 30)

    let cellWidth = props.mapDimensions.width / numOfColumns
    let cellHeight = props.mapDimensions.height / numOfRows
    
    rows = [...Array(numOfRows).keys()].map(i => {
      return <RowOfEmptyCells 
        key={i} 
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        numOfColumns={numOfColumns}
      />
    })
  }

  return (
    <TouchableOpacity style={[props.styleSheet, styles.mapMain]} onPressIn={onPressIn} onLayout={props.setMapDimensions}>
      {rows}
    </TouchableOpacity>
  )
}

const styles = {
  mapMain: {
    flexDirection: 'column',
    padding: 5,
    alignItems: 'space-around',
    alignContent: 'space-around',
    justifyContent: 'space-evenly'
  }
}