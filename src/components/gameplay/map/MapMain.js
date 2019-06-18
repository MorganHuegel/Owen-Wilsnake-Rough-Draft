import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { RowOfEmptyCells } from './RowOfEmtpyCells';

export const MapMain = (props) => {
  function onPressIn(event){
    //20px difference plus one cell-width between pageX and location on map component
    const xFromLeft = event.nativeEvent.pageX - 20 - props.cellDimensions.width;
    //100px difference plus one cell-height between pageY and location on map component
    const yFromTop = event.nativeEvent.pageY - 95 - props.cellDimensions.height;

    let nextDirection;
    const currentHead = props.snakeBalls[0]
    if (props.currentDirection === 'up' || props.currentDirection === 'down') {
      nextDirection = xFromLeft < currentHead.x ? 'left' : 'right'
    } else {
      nextDirection = yFromTop < currentHead.y ? 'up' : 'down'
    }
    props.setCurrentDirection(nextDirection)
  }


  let rows, cellWidth, cellHeight;

  if (props.mapDimensions) {
    cellWidth = props.cellDimensions.width
    cellHeight = props.cellDimensions.height
    
    rows = [...Array(Math.floor(props.mapDimensions.height / 30)).keys()].map(rowIndex => {
      return <RowOfEmptyCells 
        key={rowIndex} 
        rowIndex={rowIndex}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        ballToEat={props.ballToEat}
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
    <TouchableOpacity style={[props.styleSheet, stylesMapMain.mapMain]} onPressIn={onPressIn} onLayout={props.setMapDimensions}>
      {rows}
      <Image source={require('../../../../OWEN-WILSON.png')} style={[owenSizeStyle, stylesMapMain.owenHead]}/>
    </TouchableOpacity>
  )
}

const stylesMapMain = {
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