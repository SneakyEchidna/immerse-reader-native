import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { addWordToWordList } from '../actions';

class DefinitionScreen extends React.Component {
  render() {
    const { loading, definitions, word, addWord } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: 'flex-start',
          justifyContent: 'center',
          padding: 5
        }}
      >
        <Text
          style={{
            flex: 0,
            fontSize: 20,
            padding: 10,
            textTransform: 'capitalize'
          }}
        >
          {word}
        </Text>
        <FlatList
          data={definitions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => (
            <Text
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#f2f5f9',
                fontSize: 16,
                padding: 10
              }}
            >
              {item.item}
            </Text>
          )}
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
