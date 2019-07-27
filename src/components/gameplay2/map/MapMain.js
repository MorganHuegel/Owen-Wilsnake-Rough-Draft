import React from 'react';

import { View, TouchableOpacity } from 'react-native';
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

  onPressMap(event){
    let { pageX, pageY } = event.nativeEvent
    const mapX = event.nativeEvent.pageX - this.props.screenToMapXOffset
    const mapY = event.nativeEvent.pageY - this.props.screenToMapYOffset
    console.log(event.nativeEvent)
    console.log(pageX, mapX)
    console.log(pageY, mapY)
  }

  mapMainStyles = {
    view: {
      flex: 7
    }
  }

  render(){
    // Wait until Map Dimensions are calculated to display the Owen Snake
    const owenSnake = 
      this.state.cellDimensions.width ?
      <OwenSnakeMain mapDimensions={this.state.mapDimensions} cellDimensions={this.state.cellDimensions}/> :
      null

    return (
      <TouchableOpacity style={this.mapMainStyles.view} onLayout={event => this.setMapDimensions(event)} onPress={event => this.onPressMap(event)}>
        <CellsMain 
          mapDimensions={this.state.mapDimensions} 
          cellDimensions={this.state.cellDimensions}
        />
        {owenSnake}
      </TouchableOpacity>
    )
  }
}