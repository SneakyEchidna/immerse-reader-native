import React from 'react';
import { View, Text, Button } from 'react-native';
import { Epub, Streamer } from 'epubjs-rn';
import { connect } from 'react-redux';
import {
  bookLoaded,
  eventsLoaded,
  setIdentifier,
  setLocation,
  setFontSize,
  getDefinitions
} from '../actions';

class ReaderScreen extends React.Component {
  state = {};
  locationChange = epubcfi => {
    const {
      setLocation,
      currentBook: { name }
    } = this.props;
    name && setLocation(epubcfi);
  };

  renderLocation() {
    const { location } = this.props;
    if (location) return { location };
  }
  render() {
    const {
      currentBook: { name },
      currentBook: { book },
      currentBook: { origin }
    } = this.props;
    console.log(origin);
    return (
      <View style={{ flex: 1 }}>
        <Epub
          src={book}
          {...this.renderLocation()}
          locationChanged={this.locationChange}
          getRendition={this.getRendition}
          flow="paginated"
          onReady={f => {
            console.log('Metadata', f.package.metadata);
            console.log('Table of Contents', f.toc);
            setTimeout(console.log, 5000, 'f', f);
          }}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getDefinitions: word => {
    if (word.length > 0) {
      dispatch(getDefinitions(word.toLowerCase().trim()));
    }
  },
  bookLoadedEvent: () => {
    dispatch(bookLoaded());
  },
  eventsLoadedEvent: () => {
    dispatch(eventsLoaded());
  },
  setIdentifier: id => {
    dispatch(setIdentifier(id));
  },
  setLocation: loc => {
    dispatch(setLocation(loc));
  },
  setFontSize: size => {
    dispatch(setFontSize(size));
  }
});
const mapStateToProps = state => ({
  bookLoaded: state.reader.bookLoaded,
  eventsLoaded: state.reader.eventsLoaded,
  location: state.reader.location,
  origin: state.reader.origin,
  identifier: state.reader.identifier,
  currentBook: state.books.currentBook,
  fontSize: state.reader.fontSize
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReaderScreen);
