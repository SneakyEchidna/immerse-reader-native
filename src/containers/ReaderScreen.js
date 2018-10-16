import React from 'react';
import { View, Text, Button } from 'react-native';
import { Epub } from 'epubjs-rn';

class ReaderScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Epub
          src="https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf"
          flow="paginated"
        />
      </View>
    );
  }
}

export default ReaderScreen;
