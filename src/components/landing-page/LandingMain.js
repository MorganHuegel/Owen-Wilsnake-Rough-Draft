import React from 'react';
import { Text, View, Button } from 'react-native';

import { LogoMain } from './LogoMain';

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

        <View style={{flex: 1}}>
          <Button onPress={this.props.setToPlaying} title="Start Playing"/>
        </View>

      </View>
    )
  }
}