import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class BooksScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity>
          <Text onPress={() => this.props.navigation.navigate('ReaderDrawer')}>
            BooksScreen
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default BooksScreen;
