import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { appStarted } from '../actions';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    const { appStarted } = this.props;
    appStarted();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>AuthLoading</Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  appStarted: () => dispatch(appStarted())
});
export default connect(
  null,
  mapDispatchToProps
)(AuthLoadingScreen);
