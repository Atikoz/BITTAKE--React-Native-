import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const WordItem = ({index, text}) => {

  return (
    <View style={style.container}>
      <View style={style.wordBox}>
       <View style={style.textNumbering}>
        <Text>{index}</Text>
       </View>

       <View style={style.textBox}>
        <Text>{text}</Text>
       </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 5
  },

  wordBox: {
    flexDirection: 'row',
    width: 112,
    height: 40,
    borderRadius: 10,
    borderWidth: 1
  },

  textNumbering: {
    width: '25%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#58FFAF'
  },

  textBox: {
    width: '75%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  }
})


export default WordItem;