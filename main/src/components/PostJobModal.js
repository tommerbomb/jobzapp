import React from 'react';
import { Modal, Text, View } from 'react-native';
import { CardSection } from './common/CardSection';
import { MainButton } from './common/MainButton';

const PostJobModal = ({ children, onAccept, onDecline, visible, animationType }) => {
  const {
    containerStyle,
    textStyle,
    textCardSectionStyle,
    buttonCardSectionStyle
  } = styles;

  return (
    <Modal
      animationType={animationType}
      onRequestClose={() => {}}
      transparent
      visible={visible}
    >
      <View style={containerStyle}>
        <CardSection style={textCardSectionStyle}>
          <Text style={textStyle}>{ children }</Text>
        </CardSection>
         <CardSection style={buttonCardSectionStyle}>
          <MainButton onPress={onAccept}>Yes</MainButton>
          <MainButton onPress={onDecline}>No</MainButton>
         </CardSection>
      </View>
    </Modal>
  );
};


const styles = {
  textCardSectionStyle: {
    justifyContent: 'center',
    borderBottomWidth: 0
  },
  buttonCardSectionStyle: {
     borderBottomWidth: 0,
  },
  textStyle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    // margin: 50,
    // alignSelf: 'center'
  }
};

export { PostJobModal };
