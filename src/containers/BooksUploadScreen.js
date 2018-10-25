import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import RNFileSelector from 'react-native-file-selector';
import ButtonComponent from 'react-native-button-component';
import { uploadBook } from '../actions';

class BooksUploadScreen extends React.Component {
  state = { visible: false, author: null, title: null, valid: true };

  renderSelectBookText = () => {
    const { path } = this.state;
    return path ? path.match(/[^/]+$/g)[0] : 'Select book'; // leave only name and extension
  };
  validate = () => {
    const { author, title, path } = this.state;
    return !!author && !!title && !!path;
  };
  onUploadPress = () => {
    const { title, author, path } = this.state;
    const { uploadBook } = this.props;
    if (this.validate()) {
      uploadBook({
        name: title,
        author,
        file: path
      });
      this.setState({ valid: true });
    } else this.setState({ valid: false });
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
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
            returnKey="next"
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
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#b6b8ba',
              paddingTop: 0,
              paddingBottom: 0
            }}
          />
          <Text style={{ marginTop: 10 }}>Book .epub</Text>
          <TouchableOpacity onPress={() => this.setState({ visible: true })}>
            <TextInput value={this.renderSelectBookText()} editable={false} />
          </TouchableOpacity>
          <ButtonComponent
            style={{ paddingLeft: 20, paddingRight: 20 }}
            buttonState={`${this.props.loading}`}
            gradientStart={{ x: 0.5, y: 1 }}
            gradientEnd={{ x: 1, y: 1 }}
            states={{
              false: {
                text: 'Upload Book',
                textStyle: { fontSize: 15, letterSpacing: 1 },
                backgroundColors: ['#4DC7A4', '#66D37A'],
                onPress: this.onUploadPress
              },
              true: {
                text: 'Uploading book',
                gradientStart: { x: 0.8, y: 1 },
                gradientEnd: { x: 1, y: 1 },
                backgroundColors: ['#ff4949', '#fe6060'],
                spinner: true
              }
            }}
          />
          {!this.state.valid && (
            <Text style={{ color: 'red', paddingTop: 10 }}>
              You need to specify author and book title
            </Text>
          )}
        </View>
        <RNFileSelector
          title={'Select File'}
          visible={this.state.visible}
          onDone={path => {
            this.setState({ visible: false, path });
          }}
          onCancel={() => {
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
