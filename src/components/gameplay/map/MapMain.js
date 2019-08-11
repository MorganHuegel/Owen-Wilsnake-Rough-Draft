import React from 'react';

import { TouchableOpacity } from 'react-native';
import { CellsMain } from './CellsMain'
import { OwenSnakeMain } from './owenSnake/OwenSnakeMain';
import { ChickenWing } from './ChickenWing';

export class MapMain extends React.Component {
  state = {
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

  componentWillMount(){
    this.setChickenWing()
  }


  setChickenWing = () => {
    const xCoord = Math.floor((Math.random()) * (this.props.mapDimensions.width - this.props.cellDimensions.width))
    const yCoord = Math.floor((Math.random()) * (this.props.mapDimensions.height - this.props.cellDimensions.height))

    this.setState({chickenWing: {
      left: xCoord, top: yCoord
    }})
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
    }, () => this.props.incrementNumTouches())
  }


  mapMainStyles = {
    touchableOpacity: {
      flex: this.props.mapDimensions.height
    }
  }


  render(){
    return (
      <TouchableOpacity 
        style={this.mapMainStyles.touchableOpacity} 
        activeOpacity={0.8}
        onPress={event => this.onPressMap(event)}
        >
        <CellsMain 
          mapDimensions={this.props.mapDimensions} 
          cellDimensions={this.props.cellDimensions}
        />
        <ChickenWing cellDimensions={this.props.cellDimensions} chickenPosition={this.state.chickenWing}/>
        <OwenSnakeMain 
          incrementPoints={this.props.incrementPoints}
          mapDimensions={this.props.mapDimensions} 
          cellDimensions={this.props.cellDimensions} 
          lastPressed={this.state.lastPressed}
          playOwenSound={this.props.playOwenSound}
          chickenWing={this.state.chickenWing}
          setChickenWing={this.setChickenWing}
          difficulty={this.props.difficulty}/>
      </TouchableOpacity>
    )
  }
}