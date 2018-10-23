import React from 'react';
import { Text, Button, View, TouchableOpacity } from 'react-native';

const BookListItem = ({ item, onPress, onDelete }) => {
  const pressHandler = () => {
    onPress(item);
  };
  const deleteHandler = () => {
    onDelete(item.key);
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <TouchableOpacity onPress={pressHandler}>
          <Text style={{ padding: 10, fontSize: 20 }}>
            {`${item.name} - ${item.author}`}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0,
          alignItems: 'flex-end',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Button title="x" onPress={deleteHandler} color="red" />
      </View>
    </View>
  );
};

export default BookListItem;
