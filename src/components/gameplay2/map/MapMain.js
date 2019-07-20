import React from 'react';

import { View, Text } from 'react-native';

export class MapMain extends React.Component {

  mapMainStyles = {
    view: {
      flex: 7
    }
  }

  render(){
    return (
      <View style={this.mapMainStyles.view}>
        <Text>Map Main</Text>
      </View>
    )
  }
}