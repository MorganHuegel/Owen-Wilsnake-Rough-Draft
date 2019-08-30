import React from 'react';
import { View, Button } from 'react-native';

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
        <Button title='Logout' onPress={() => this.props.setLoggedIn(false)} color='white'/>
      </View>
    )
  }
}