import React, { Component } from 'react';
import * as actions from '../actions';
import { View, Text, Platform } from 'react-native';
import MapView from 'react-native-maps';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {
  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      // for the zoom
      latitudeDelta: 0.045,
      longitudeDelta: 0.02,
    };
    return (
      <Card key={job.jobkey} title={job.jobtitle} titleStyle={{ fontSize: 16 }}>
        <View style={{ height: 300 }}>
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
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No more jobs!">
        <Button
          title="Back To Map"
          icon={{ name: 'my-location' }}
          onPress={() => this.props.navigation.navigate('Map')}
        />
      </Card>
    );
  };

  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <Swipe
          keyProps="jobkey"
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={(job) => this.props.likeJob(job)}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
};

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);
