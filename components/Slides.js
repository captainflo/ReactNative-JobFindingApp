import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(idx) {
    if (idx === this.props.data.length - 1) {
      return (
        <View style={styles.containerButton}>
          <Button
            title="Onwards!"
            raised
            buttonStyle={styles.buttonStyle}
            onPress={this.props.onComplete}
          />
        </View>
      );
    }
  }

  renderSlides() {
    return this.props.data.map((slide, idx) => {
      return (
        <View
          key={slide.text}
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
        >
          <Text style={styles.slideText}>{slide.text}</Text>
          {this.renderLastSlide(idx)}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }} horizontal pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  slideText: {
    fontSize: 30,
    color: '#fff',
  },
  containerButton: {
    marginTop: 15,
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
  },
};

export default Slides;
