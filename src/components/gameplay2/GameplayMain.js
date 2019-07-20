import React from 'react';
import { Text, View, Animated } from 'react-native';

import { Header } from './Header';
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

  gameplayMainStyles = {
    view: {
      backgroundColor: 'red',
      display: 'flex',
      flex: 1,
      borderWidth: 2,
      borderColor: 'rgb(255, 255, 255)'
    }
  }

  render(){
    return (
      <Animated.View style={this.gameplayMainStyles.view}>
        <Header />
        <MapMain />
      </Animated.View>
    )
  }
}