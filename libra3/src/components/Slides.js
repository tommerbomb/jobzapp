import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { BACKGROUND_COLOR } from '../styles/GlobalStyles';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
        title='Onwards'
        buttonStyle={styles.buttonStyle}
        textStyle={styles.buttonTextStyle}
        onPress={this.props.onComplete}
        />
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, i) => {
      return (
        <View
        key={slide.text}
        style={[styles.slideStyle, { backgroundColor: slide.color }]}
        >
          <Text style={styles.textStyle}>{slide.text}</Text>
          {this.renderLastSlide(i)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
      horizontal
      pagingEnabled
      style={{ flex: 1 }}
      >
      {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    padding: 10
  },
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  buttonStyle: {
    marginTop: 25,
    borderRadius: 50,
    backgroundColor: BACKGROUND_COLOR
  },
  buttonTextStyle: {
    fontSize: 18
  }
};

export default Slides;
