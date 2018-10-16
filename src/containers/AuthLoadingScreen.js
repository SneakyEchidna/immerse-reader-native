import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      user
        ? this.props.navigation.navigate('App')
        : this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>AuthLoading</Text>
      </View>
    );
  }
}

export default AuthLoadingScreen;
