import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import MapView from 'react-native-maps';

class ReviewScreen extends Component {
  renderLikedJobs() {
    return this.props.likedJobs.map((job) => {
      const initialRegion = {
        longitude: job.longitude,
        latitude: job.latitude,
        // for the zoom
        latitudeDelta: 0.045,
        longitudeDelta: 0.02,
      };
      return (
        <Card title={job.jobtitle} key={job.jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android' ? true : false} // it's render as static image
              scrollEnabled={false} // cannot scroll
              zoomTapEnabled={false}
              zoomEnabled={false}
              zoomControlEnabled={false}
              initialRegion={initialRegion}
            />
          </View>
          <View style={styles.detailWrapper}>
            <Text style={styles.italics}>{job.company}</Text>
            <Text>{job.formattedRelativeTime}</Text>
          </View>
          <Button title="Apply Now!" onPress={() => Linking.openURL(job.url)} />
        </Card>
      );
    });
  }

  render() {
    return (
      <View>
        <ScrollView>{this.renderLikedJobs()}</ScrollView>
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  italics: {
    fontStyle: 'italic',
  },
};

function mapStateToProps(state) {
  return {
    likedJobs: state.likedJobs,
  };
}

export default connect(mapStateToProps)(ReviewScreen);
