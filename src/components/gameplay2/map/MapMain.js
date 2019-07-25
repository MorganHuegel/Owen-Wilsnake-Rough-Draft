import React from 'react';

import { View } from 'react-native';
import { CellsMain } from './CellsMain'
import { OwenSnakeMain } from './owenSnake/OwenSnakeMain';

export class MapMain extends React.Component {
  state = {
    mapDimensions: {
      width: null, 
      height: null, 
      numOfColumns: null,
      numOfRows: null
    },
    cellDimensions: {
      width: null,
      height: null
    }
  }

  setMapDimensions(event){
    //Set Map Dimensions based on size of View component
    const mapWidth = event.nativeEvent.layout.width
    const mapHeight = event.nativeEvent.layout.height

    const numOfColumns = Math.floor(mapWidth / 30)
    const numOfRows = Math.floor(mapHeight / 30)

    const cellWidth = mapWidth / numOfColumns
    const cellHeight = mapHeight / numOfRows

    this.setState({
      cellDimensions: {
        width: cellWidth,
        height: cellHeight
      },
      mapDimensions: {
        width: mapWidth,
        height: mapHeight,
        numOfColumns,
        numOfRows
      }
    })
  }

  mapMainStyles = {
    view: {
      flex: 7
    }
  }

  render(){
    return (
      <View style={this.mapMainStyles.view} onLayout={event => this.setMapDimensions(event)}>
        <CellsMain 
          mapDimensions={this.state.mapDimensions} 
          cellDimensions={this.state.cellDimensions}
        />
        <OwenSnakeMain mapDimensions={this.state.mapDimensions} cellDimensions={this.state.cellDimensions}/>
      </View>
    )
  }
}