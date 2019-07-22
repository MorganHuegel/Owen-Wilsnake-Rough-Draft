import React from 'react';

import { View, Text } from 'react-native';

export class MapMain extends React.Component {
  state = {
    mapDimensions: {
      width: null, 
      height: null, 
      numOfColumns: null,
      numOfRows: null
    },
    cellDimensions: {
      cellWidth: null,
      cellHeight: null
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
        <Text>map width {this.state.mapDimensions.width}</Text>
        <Text>map height {this.state.mapDimensions.height}</Text>
        <Text>num Col {this.state.mapDimensions.numOfColumns}</Text>
        <Text>num Row {this.state.mapDimensions.numOfRows}</Text>
        <Text>cell width {this.state.cellDimensions.width}</Text>
        <Text>cell height {this.state.cellDimensions.height}</Text>
      </View>
    )
  }
}