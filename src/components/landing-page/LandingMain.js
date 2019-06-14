import React from 'react';
import { Text, View, Button } from 'react-native';

export class LandingMain extends React.Component {
  render(){
    return (
      <View>
        <Text>Landing Main</Text>
        <Button onPress={this.props.setToPlaying} title="Start Playing"/>
      </View>
    )
  }
}