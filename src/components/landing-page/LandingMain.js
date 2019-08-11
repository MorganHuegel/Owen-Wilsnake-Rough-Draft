import React from 'react';
import { View } from 'react-native';

import { LogoMain } from './logo/LogoMain';
import { StartButton } from './StartButton';

export class LandingMain extends React.Component {
  landingMainStyles = {
    main: {
      display: 'flex',
      flex: 1
    }
  }

  render(){
    return (
      <View style={this.landingMainStyles.main}>
        <LogoMain />
        <StartButton setToPlaying={this.props.setToPlaying}/>
      </View>
    )
  }
}