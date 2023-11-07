import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ItemCoinBalance from './ItemCoinBalance';

const Carusel = ({ array, navigation }) => {

  const filterArray = array.filter(coin => coin.status === true);

  return (
    <ScrollView style={style.wrapper} horizontal={true} >
      <View style={style.container}>
        {filterArray.map((data, index) => <ItemCoinBalance coin={data.coin} amount={data.amount} sum={data.amountInUsd} navigation={navigation} key={index} />)}
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  wrapper: {
    flex: 0,
  },

  container: {
    flexDirection: 'row',
    flex: 0,
    alignItems: 'center',
  }
});

export default Carusel;

