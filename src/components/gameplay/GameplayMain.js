import React from 'react';
import { View } from 'react-native';

import { Header } from './map/Header';
import { MapMain } from './map/MapMain';

let Sound = require('react-native-sound');
Sound.setCategory('Playback'); // Enable playback in silence mode
const soundsFolder = '../../../sounds'
let soundBytes = [
  require(`${soundsFolder}/owen-wilson-saying-wow.mp3`),
  require(`${soundsFolder}/owen-wilson-saying-wow-1.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-2.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-3.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-4.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-5.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-6.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-7.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-8.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-9.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-10.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-11.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-12.m4a`),
  require(`${soundsFolder}/owen-wilson-saying-wow-13.m4a`)
]


export class GameplayMain extends React.Component {
  state = {
    snakeBalls: [{x: -10, y:0}],
    cellDimensions: {width: null, height: null},
    currentDirection: 'right', //one of either: up, down, left, right
    ballToEat: {columnIndex: null, rowIndex: null}, //columnIndex and rowIndex (NOT pixels)
    mapDimensions: {width: null, height: null},
  }

  soundByte = 0

  setAudio = () => {
    this.audio = new Sound(soundBytes[this.soundByte], err => {
      if (err) {
        console.log(err)
      }
      this.soundByte = (this.soundByte === soundBytes.length - 1) ? 0 : this.soundByte + 1
    })
  }

  componentDidMount(){
    this.setAudio()
    this.moveInterval = setInterval(this.moveOwen, 300)
  }

  componentWillUnmount(){
    clearInterval(this.moveInterval)
  }


  setBallToEat = (firstTurn = false) => {
    const numOfRows = this.state.mapDimensions.height / this.state.cellDimensions.height
    const numOfColumns = this.state.mapDimensions.width / this.state.cellDimensions.width

    let rowIndex = Math.floor(Math.random() * numOfRows)
    let columnIndex = Math.floor(Math.random() * numOfColumns)

    if (firstTurn && (rowIndex === 0 || columnIndex === 0)) {
      rowIndex = 1
      columnIndex = 1
    }

    ballCoordinate = {rowIndex, columnIndex}
    this.setState({ballToEat: ballCoordinate})
  }


  moveOwen = () => {
    let nextCoordinate = {x: 0, y: 0}
    let nextDirection = this.state.currentDirection

    switch(this.state.currentDirection){
      case('up'):
        nextCoordinate.x = this.state.snakeBalls[0].x
        nextCoordinate.y = this.state.snakeBalls[0].y - this.state.cellDimensions.height
        if (nextCoordinate.y < 0) {
          nextCoordinate.y = this.state.cellDimensions.height
          nextDirection = 'down'
        }
        break;
      case('down'):
        nextCoordinate.x = this.state.snakeBalls[0].x
        nextCoordinate.y = this.state.snakeBalls[0].y + this.state.cellDimensions.height
        if (nextCoordinate.y > this.state.mapDimensions.height - this.state.cellDimensions.height) {
          nextCoordinate.y = this.state.mapDimensions.height - 2 * this.state.cellDimensions.height
          nextDirection = 'up'
        }
        break;
      case('right'):
        nextCoordinate.x = this.state.snakeBalls[0].x + this.state.cellDimensions.width
        nextCoordinate.y = this.state.snakeBalls[0].y
        if (nextCoordinate.x > this.state.mapDimensions.width - this.state.cellDimensions.width - 20) {
          nextCoordinate.x = this.state.mapDimensions.width - this.state.cellDimensions.width - 10
          nextDirection = 'left'
        }
        break;
      case('left'):
        nextCoordinate.x = this.state.snakeBalls[0].x - this.state.cellDimensions.width
        nextCoordinate.y = this.state.snakeBalls[0].y
        if (nextCoordinate.x < 0) {
          nextCoordinate.x = -10
          nextDirection = 'right'
        }
        break;    
      default:
        break;
    }

    updatedSnakeBalls = [nextCoordinate, ...this.state.snakeBalls]
    //Check if owen will be on top of chicken (plus or minus 8 pixels)
    let chickenXCoordinate = this.state.ballToEat.columnIndex * this.state.cellDimensions.width - 10
    let chickenYCoordinate = this.state.ballToEat.rowIndex * this.state.cellDimensions.height
    if (
      Math.abs(chickenXCoordinate - nextCoordinate.x) < 8 &&
      Math.abs(chickenYCoordinate - nextCoordinate.y) < 8
    ){
      return this.setState({
        snakeBalls: updatedSnakeBalls,
        currentDirection: nextDirection
      }, () => this.ateChicken())
    } else {
      updatedSnakeBalls.pop()
      this.setState({
        snakeBalls: updatedSnakeBalls,
        currentDirection: nextDirection
      })    
    }
  }

  setCurrentDirection = (nextDirection) => {
    this.setState({currentDirection: nextDirection})
  }


  ateChicken = () => {
    this.audio.play() // <-- takes an optional callback for debugging  (success) => {...}
    this.setAudio()
    this.setBallToEat();
  }


  setMapDimensions = (event) => {
    windowWidth = event.nativeEvent.layout.width - 10
    windowHeight = event.nativeEvent.layout.height - 10

    let numOfColumns = Math.floor(windowWidth / 30)
    let numOfRows = Math.floor(windowHeight / 30)
    cellWidth = windowWidth / numOfColumns
    cellHeight = windowHeight / numOfRows

    this.setState({
      cellDimensions: {
        width: cellWidth,
        height: cellHeight
      },
      mapDimensions: {
        width: windowWidth,
        height: windowHeight
      }
    }, () => this.setBallToEat(true)) // <--- callback to set ballToEat when finished rendering map
  }

  render(){
    return (
      <View style={stylesGameplayMain.container}>
        <Header
          styleSheet={stylesGameplayMain.header} 
          backToLanding={this.props.backToLanding}
        />
        <MapMain 
          setCurrentDirection={this.setCurrentDirection}
          cellDimensions={this.state.cellDimensions}
          styleSheet={stylesGameplayMain.mapMain} 
          mapDimensions={this.state.mapDimensions} 
          setMapDimensions={this.setMapDimensions} 
          snakeBalls={this.state.snakeBalls}
          currentDirection={this.state.currentDirection}
          ballToEat={this.state.ballToEat}
        />
      </View>
    )
  }
}

const stylesGameplayMain = {
  container: {
    flex: 1,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: 'rgb(120, 120, 120)'
  },
  header: {
    // flex: 1,
    height: 60,
    backgroundColor: 'black'
  },
  mapMain: {
    flex: 8,
    backgroundColor: 'rgb(70, 70, 70)'
  }
}