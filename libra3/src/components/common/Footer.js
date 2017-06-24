//Import libraries for making a Component
import React from 'react';
import { Text, View } from 'react-native';
import { BACKGROUND_COLOR } from '../../../styles/GlobalStyles';

//Make a Component
const Footer = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
     <View style={viewStyle}>
     <Text style={textStyle}>I am a footer</Text>
     </View>
   );
};


const styles = {
  viewStyle: {
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    elevation: 2,
    position: 'relative',
    marginBottom: 10
  },
  textStyle: {
    fontSize: 20
  },
};

//Make the component available to other parts of the App
export { Footer };
