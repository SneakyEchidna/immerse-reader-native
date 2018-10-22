import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { addWordToWordList } from '../actions';

class DefinitionScreen extends React.Component {
  render() {
    const { loading, definitions, word, addWord } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{word}</Text>
        <FlatList
          data={definitions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => <Text>{item.item}</Text>}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  definitions: state.definition.definitions,
  word: state.definition.word,
  loading: state.definition.loading
});
const mapDispatchToProps = dispatch => ({
  addWord: (word, definitions) => dispatch(addWordToWordList(word, definitions))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefinitionScreen);
