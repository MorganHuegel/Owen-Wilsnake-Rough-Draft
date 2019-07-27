import React from 'react';

import { TouchableOpacity } from 'react-native';
import { CellsMain } from './CellsMain'
import { OwenSnakeMain } from './owenSnake/OwenSnakeMain';
import { ChickenWing } from './ChickenWing';

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
    },
    lastPressed: {
      mapX: null,
      mapY: null,
      numOfTouches: 0 /* Will increment with each touch. 
                       needed for child component OwenSnakeMain so that
                       ComponentDidUpdate method knows if it's a new press or not */
    },
    chickenWing: {
      left: null,
      top: null
    }
  }

  setChickenWing(){
    const xCoord = Math.floor((Math.random()) * (this.state.mapDimensions.width - this.state.cellDimensions.width))
    const yCoord = Math.floor((Math.random()) * (this.state.mapDimensions.height - this.state.cellDimensions.height))

    this.setState({chickenWing: {
      left: xCoord, top: yCoord
    }})
  }

  setMapDimensions(event){
    //Set Map Dimensions based on size of View component
    const mapWidth = event.nativeEvent.layout.width
    const mapHeight = event.nativeEvent.layout.height

    const numOfColumns = Math.floor(mapWidth / 30)
    const numOfRows = Math.floor(mapHeight / 30)

    const cellWidth = mapWidth / numOfColumns
    const cellHeight = mapHeight / numOfRows

    const xChickenCoord = Math.floor((Math.random()) * (mapWidth - cellWidth))
    const yChickenCoord = Math.floor((Math.random()) * (mapHeight - cellHeight))

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
      },
      chickenWing: {
        left: xChickenCoord,
        top: yChickenCoord
      }
    })
  }

  onPressMap(event){
    const mapX = event.nativeEvent.pageX - this.props.screenToMapXOffset
    const mapY = event.nativeEvent.pageY - this.props.screenToMapYOffset

    this.setState({
      lastPressed: {
        mapX, 
        mapY, 
        numOfTouches: this.state.lastPressed.numOfTouches + 1
      }
    })
  }

  mapMainStyles = {
    touchableOpacity: {
      flex: 7
    }
  }

  render(){
    // Wait until Map Dimensions are calculated to display the Owen Snake
    const owenSnake = 
      this.state.cellDimensions.width ?
      <OwenSnakeMain mapDimensions={this.state.mapDimensions} cellDimensions={this.state.cellDimensions} lastPressed={this.state.lastPressed}/> :
      null

    const chickenWing =
      this.state.chickenWing.left ?
      <ChickenWing cellDimensions={this.state.cellDimensions} chickenPosition={this.state.chickenWing}/> :
      null

    return (
      <TouchableOpacity 
        style={this.mapMainStyles.touchableOpacity} 
        activeOpacity={0.8}
        onLayout={event => this.setMapDimensions(event)} 
        onPress={event => this.onPressMap(event)}
        >
        <CellsMain 
          mapDimensions={this.state.mapDimensions} 
          cellDimensions={this.state.cellDimensions}
        />
        {chickenWing}
        {owenSnake}
      </TouchableOpacity>
    )
  }
}