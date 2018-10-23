import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button } from 'react-native';
import RNFileSelector from 'react-native-file-selector';
import { uploadBook } from '../actions';

class BooksUploadScreen extends React.Component {
  state = { visible: false };
  titleRef = React.createRef();
  authorRef = React.createRef();
  fileRef = React.createRef();

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          onPress={() => this.setState({ visible: true })}
          style={{
            flex: 0,
            fontSize: 20,
            padding: 20
          }}
        >
          Book Upload
        </Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ marginTop: 10 }}>Book Title</Text>
          <TextInput
            onChangeText={text => this.setState({ title: text })}
            ref={this.titleRef}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#b6b8ba',
              paddingTop: 0,
              paddingBottom: 0
            }}
          />
          <Text style={{ marginTop: 10 }}>Author</Text>
          <TextInput
            onChangeText={text => this.setState({ author: text })}
            ref={this.authorRef}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#b6b8ba',
              paddingTop: 0,
              paddingBottom: 0
            }}
          />
          <Text style={{ marginTop: 10 }}>Book .epub</Text>
          <Text onPress={() => this.setState({ visible: true })}>
            select Book
          </Text>
          <TextInput
            value={this.state.path}
            editable={false}
            ref={this.fileRef}
          />
          <Button
            title="Upload Book"
            onPress={() => {
              console.log(this.state.author, this.state.title, this.state.path);
              this.props.uploadBook({
                name: this.state.title,
                author: this.state.author,
                file: this.state.path
              });
            }}
          />
        </View>
        <RNFileSelector
          title={'Select File'}
          visible={this.state.visible}
          onDone={path => {
            console.log('file selected: ' + path);
            this.setState({ visible: false, path });
          }}
          onCancel={() => {
            console.log('cancelled');
            this.setState({ visible: false });
          }}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  uploadBook: data => {
    dispatch(uploadBook(data));
  }
});
const mapStateToProps = state => ({
  loading: state.books.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksUploadScreen);
