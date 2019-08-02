import React from 'react';
import { Animated, Easing } from 'react-native';

import { Header } from './header/Header';
import { MapMain } from './map/MapMain';


/// LOAD THE SOUND BYTES //////////////////////////////////////
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
////////////////////////////////////////////////////////////////


export class GameplayMain extends React.Component {
  state = {
    owenSoundIndex: 0,
    viewOpacity: new Animated.Value(0),
    mapDimensions: {
      width: null, 
      height: null, 
      numOfColumns: null,
      numOfRows: null,
      headerHeight: null
    },
    cellDimensions: {
      width: null,
      height: null
    }
  }


  soundByte = new Sound(soundBytes[this.state.owenSoundIndex])


  playOwenSound = () => {
    this.soundByte.play()

    const nextSoundByte = 
      (this.state.owenSoundIndex === soundBytes.length - 1)
      ? 0 : this.state.owenSoundIndex + 1

    this.setState({owenSoundIndex: nextSoundByte}, () => {
      this.soundByte = new Sound(soundBytes[this.state.owenSoundIndex], err => {
        if (err) {
          console.log(err)
        }
      })
    })
  }


  componentDidMount(){
    Animated.timing(this.state.viewOpacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start()
  }


  componentDidUpdate(prevProps){
    // Component is about to unmount
    if(!prevProps.fadingOutGameplay && this.props.fadingOutGameplay) {
      Animated.timing(this.state.viewOpacity, {
        toValue: 0,
        duration: this.props.fadeOutGameplayTime,
        easing: Easing.linear
      }).start()
    }
  }


  setMapDimensions(event){
    const gameplayHeight = event.nativeEvent.layout.height - (2 * this.gameplayMainStyles.view.borderWidth)  //<-- 4px border
    const gameplayWidth = event.nativeEvent.layout.width - (2 * this.gameplayMainStyles.view.borderWidth)

    const numOfColumns = Math.floor(gameplayWidth / 30)
    const cellWidth = gameplayWidth / numOfColumns
    const cellHeight = cellWidth

    const numOfRows = Math.floor( (gameplayHeight * 8/9) / cellHeight)
    const spaceLeftAtBottom = (gameplayHeight * 8/9) - (numOfRows * cellHeight)
    const headerHeight = gameplayHeight * 1/9 + spaceLeftAtBottom
    const mapHeight = gameplayHeight - headerHeight

    this.setState({
      mapDimensions: {
        width: gameplayWidth,
        height: mapHeight,
        numOfColumns,
        numOfRows,
        headerHeight
      },
      cellDimensions: {
        width: cellWidth,
        height: cellHeight
      }
    })
  }



  render(){
    let mapMain, header
    if (this.state.mapDimensions.height) {
      mapMain = <MapMain 
        screenToMapXOffset={this.gameplayMainStyles.view.borderWidth + this.props.screenPaddingX}
        screenToMapYOffset={this.gameplayMainStyles.view.borderWidth + this.props.screenPaddingY + this.state.mapDimensions.headerHeight}
        mapDimensions={this.state.mapDimensions} 
        cellDimensions={this.state.cellDimensions}
        playOwenSound={this.playOwenSound}
      />
      header = <Header backToLanding={this.props.backToLanding} mapDimensions={this.state.mapDimensions} />
    }

    return (
      <Animated.View style={this.gameplayMainStyles.view} onLayout={event => this.setMapDimensions(event)}>
        {header}
        {mapMain}
      </Animated.View>
    )
  }


  gameplayMainStyles = {
    view: {
      opacity: this.state.viewOpacity,
      backgroundColor: 'rgb(110, 110, 110)',
      display: 'flex',
      flex: 1,
      borderWidth: 2,
      borderColor: 'rgb(255, 255, 255)'
    }
  }
}