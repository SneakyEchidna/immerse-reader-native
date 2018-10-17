import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class BooksScreen extends React.Component {
  render() {
    console.log(this.props);
    const { toReader } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity>
          <Text onPress={toReader}>BooksScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toReader: () =>
    dispatch(NavigationActions.navigate({ routeName: 'ReaderDrawer' }))
});
export default connect(
  null,
  mapDispatchToProps
)(BooksScreen);
