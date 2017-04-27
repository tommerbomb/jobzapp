import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { BUTTON_COLOR } from '../../styles/GlobalStyles';

const Button = (props) => {
  const { buttonStyle, textStyle } = styles;
  const { onPress, children } = props;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        { children }
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: BUTTON_COLOR,
      borderRadius: 50,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 10,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
};

export { Button };
