import React from 'react';
import { Text, View, Button } from 'react-native';

export class GameplayMain extends React.Component {
  render(){
    return (
      <View>
        <Text>Gamplay Main</Text>
        <Button onPress={this.props.backToLanding} title="Back to Landing"/>
      </View>
    )
  }
}