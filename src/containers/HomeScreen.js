import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

class HomeScreen extends React.Component {
  componentDidMount() {
    console.log('didmount');
    GoogleSignin.configure({
      webClientId:
        '15568065126-rvnrh8ihk6k2r6rlpoaurd0u55sgga70.apps.googleusercontent.com'
    });
    console.log(firebase.auth().currentUser);
  }

  navigateToBooks = () => this.props.navigation.navigate('BooksDrawer');

  signIn = () => {
    GoogleSignin.signIn()
      .then(data => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );
        // Login with the credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then(user => {
        console.log(this.props);
        if (user) {
          this.navigateToBooks();
        }
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch(error => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <TouchableOpacity>
          <Button
            title="Reader"
            onPress={() => navigation.navigate('ReaderDrawer')}
          />
        </TouchableOpacity>
        <GoogleSigninButton
          style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
        />
      </View>
    );
  }
}

export default HomeScreen;
