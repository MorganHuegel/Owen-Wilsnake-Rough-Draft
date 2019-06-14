import React from 'react';
import { Text, View, Button } from 'react-native';

export const Header = (props) => {
  return (
    <View style={props.styleSheet}>
      <Text style={styles.headerText}>Header</Text>
      <Button onPress={props.backToLanding} title="Back to Landing" style={styles.button}/>
    </View>
  )
}

const styles = {
  headerText: {
    
  },
  button: {
    
  }
}