import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import {
  loadBooksList,
  openBook,
  deleteBook,
  toggleBookUpload
} from '../actions';

class BooksScreen extends React.Component {
  componentDidMount() {
    const { loadBooksList } = this.props;
    loadBooksList();
  }
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity>
          <Text onPress={navigation.openDrawer}>Upload Book</Text>
        </TouchableOpacity>
        <FlatList
          data={booksList}
          onRefresh={loadBooksList}
          refreshing={false}
          keyExtractor={item => item.key}
          renderItem={book => (
            <TouchableOpacity>
              <Text onPress={() => openBook(book.item)}>{book.item.name}</Text>
            </TouchableOpacity>
          )}
        />
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
