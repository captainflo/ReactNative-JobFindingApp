import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapScreen extends React.Component {
  state = {
    maploaded: false,
    region: {
      longitude: -97.746597,
      latitude: 30.26498,
      longitudeDelta: 0.06858553581440674,
      latitudeDelta: 0.2485112299999983,
    },
  };

  componentDidMount() {
    this.setState({ maploaded: true });
  }

  // onRegionChange = (region) => {
  //   this.setState({ region });
  // };

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () =>
      this.props.navigation.navigate('Deck')
    );
  };

  render() {
    if (!this.state.maploaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <>
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            region={this.state.region}
            // onRegionChange={this.onRegionChange}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search this Area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
});

export default connect(null, actions)(MapScreen);
