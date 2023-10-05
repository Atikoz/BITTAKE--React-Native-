import React from 'react';
import WordItem from './RegisterWordItem';
import { Text, View, StyleSheet } from 'react-native';

const BoxWordItems = ({ array }) => {
  return(
    <View style={style.container}>
      <Text>
        {array.map((word, index) => <WordItem  index={index+1} text={word}/> )}
      </Text>
    </View>
  )
};

const style = StyleSheet.create({
  container: {
    flex: 0,
    top: 20,
    alignItems: 'center',

  }
})

export default BoxWordItems;
