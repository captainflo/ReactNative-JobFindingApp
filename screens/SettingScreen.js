import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { View, Text } from 'react-native';

class SettingScreen extends Component {
  render() {
    return (
      <View>
        <Button
          onPress={this.props.clearLikedJobs}
          title="Reset Liked Jobs"
          icon={{ name: 'delete-forever' }}
        />
      </View>
    );
  }
}

export default connect(null, actions)(SettingScreen);
