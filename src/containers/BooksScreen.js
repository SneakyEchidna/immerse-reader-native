import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import {
  loadBooksList,
  openBook,
  deleteBook,
  toggleBookUpload
} from '../actions';
import BookListItem from '../components/BookListItem';

class BooksScreen extends React.Component {
  static navigationOptions = {
    title: 'Books'
  };

  componentDidMount() {
    const { loadBooksList, navigation } = this.props;
    loadBooksList();
    this._sub = navigation.addListener('didFocus', this.onEnter);
  }

  componentWillUnmount() {
    this._sub.remove();
  }

  onEnter = () => {
    const { loadBooksList } = this.props;
    loadBooksList();
  };

  render() {
    const {
      toReader,
      booksList,
      openBook,
      deleteBook,
      loadBooksList,
      navigation
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 10,
          backgroundColor: 'white'
        }}
      >
        <FlatList
          data={booksList}
          onRefresh={loadBooksList}
          refreshing={false}
          keyExtractor={item => item.key}
          renderItem={book => (
            <BookListItem
              onPress={openBook}
              item={book.item}
              onDelete={deleteBook}
            />
          )}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyItems: 'center'
          }}
          onPress={navigation.openDrawer}
        >
          <Text>Upload Book</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({
  books: { booksList },
  books: { showBookUpload }
}) => ({
  booksList,
  showBookUpload
});

const mapDispatchToProps = dispatch => ({
  loadBooksList: () => {
    dispatch(loadBooksList());
  },
  openBook: book => {
    dispatch(openBook(book));
  },
  deleteBook: key => {
    dispatch(deleteBook(key));
  },
  toggleBookUpload: () => {
    dispatch(toggleBookUpload());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksScreen);
