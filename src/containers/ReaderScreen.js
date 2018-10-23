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

  book = {};

  rendition = {};

  locationChange = epubcfi => {
    const {
      setLocation,
      currentBook: { name }
    } = this.props;
    name && setLocation(epubcfi.start.cfi);
  };

  debounce = (func, wait, immediate) => {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  findDefinition = this.debounce(cfiRange => {
    const { getDefinitions } = this.props;
    this.book.getRange(cfiRange.toString()).then(range => {
      if (range) {
        try {
          return getDefinitions(
            range.startContainer.data.slice(range.startOffset, range.endOffset)
          );
        } catch (e) {
          console.log(e);
        }
      }
    });
  }, 500);

  getRendition = rendition => {
    this.rendition = rendition;
  };

  renderLocation() {
    const { location } = this.props;
    if (location) return { location };
  }

  bookReady = loadedBook => {
    this.book = loadedBook;
  };

  onSelect = (cfiRange, rendition) => {
    // Add marker
    rendition.highlight(cfiRange, {});
  };

  render() {
    const {
      currentBook: { name },
      currentBook: { book },
      getDefinitions
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Epub
          src={book}
          {...this.renderLocation()}
          onLocationChange={this.locationChange}
          getRendition={this.rendition}
          flow="paginated"
          onReady={this.bookReady}
          onSelected={this.onSelect}
          onMarkClicked={this.findDefinition}
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
