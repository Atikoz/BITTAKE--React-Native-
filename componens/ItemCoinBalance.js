import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const circumcisionCurrency = (sum) => {
  return Math.trunc(sum * 1e2) / 1e2
};

const circumcisionAmount = (sum) => {
  return Math.trunc(sum * 1e5) / 1e5
}

const ItemCoinBalance = ({ coin, amount, object, navigation, symbol, selectCurrency }) => {

  return (
    <TouchableOpacity style={style.container} onPress={() => navigation.navigate('WalletCoinMenuScreen', { coin, object, symbol, selectCurrency })}>
      <View style={style.topBox}>
        <Text style={style.styleText}>{coin.toUpperCase()}</Text>
        <Text style={style.styleText}>{circumcisionAmount(amount)}</Text>
      </View>

      <View style={style.botBox}>
        <Text style={style.styleText}> {symbol}{circumcisionCurrency(object[selectCurrency])}</Text>
      </View>
    </TouchableOpacity>
  )
};

const style = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    backgroundColor: 'black',
    borderRadius: 10,
    margin: 10
  },

  topBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
    height: '50%',
    paddingTop: 20,
    padding: 12
  },

  botBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 'auto',
    height: '50%',
    paddingBottom: 18,
    padding: 12,
  },

  styleText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 14
  }
});

export default ItemCoinBalance;