import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { RowOfEmptyCells } from './RowOfEmtpyCells';

export const MapMain = (props) => {
  function onPressIn(event){
    const xFromTop = event.nativeEvent.locationX;
    const yFromTop = event.nativeEvent.locationY;
    console.log(xFromTop, yFromTop)
  }

  let rows, cellWidth, cellHeight;

  if (props.mapDimensions) {
    cellWidth = props.cellDimensions.width
    cellHeight = props.cellDimensions.height
    
    rows = [...Array(Math.floor(props.mapDimensions.height / 30)).keys()].map(i => {
      return <RowOfEmptyCells 
        key={i} 
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        numOfColumns={Math.floor(props.mapDimensions.width / 30)}
      />
    })
  }

  let owenSizeStyle = (isNaN(cellWidth) || isNaN(cellHeight)) ?
    {display: 'none'} :
    {
      display: 'flex',
      width: cellWidth, 
      height: cellHeight, 
      top: props.snakeBalls[0].y + 5, 
      right: props.mapDimensions.width - props.snakeBalls[0].x - cellWidth - 5};

  return (
    <TouchableOpacity style={[props.styleSheet, styles.mapMain]} onPressIn={onPressIn} onLayout={props.setMapDimensions}>
      {rows}
      <Image source={require('../../../../OWEN-WILSON.png')} style={[owenSizeStyle, styles.owenHead]}/>
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
  },
  owenHead: {
    position: 'absolute'
  }
}