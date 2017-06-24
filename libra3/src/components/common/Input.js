import React from 'react';
import { TextInput, View } from 'react-native';
import { BACKGROUND_COLOR } from '../../../styles/GlobalStyles';

const Input = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCorrect={false}
      style={inputStyle}
      value={value}
      onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: BACKGROUND_COLOR,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    textAlign: 'center'
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#fff',
    padding: 5,
    justifyContent: 'flex-start',
    position: 'relative',
    marginLeft: 5,
    marginRight: 5,
  }
};

export { Input };
