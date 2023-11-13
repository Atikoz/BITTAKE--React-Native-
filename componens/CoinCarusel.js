import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ItemCoinBalance from './ItemCoinBalance';
import funcionLocalData from '../function/funcionLocalData';
const getUserData = funcionLocalData.getUserData;

const Carusel = ({ array, navigation, symbol }) => {
  const [selectCurrency, setSelectCurrency] = useState([]);

  const filterArray = array.filter(coin => coin.status === true);

  useEffect(() => {
    const getSelectCurrency = async () => {
      const selectCurr = await getUserData('selectCurrency');
      setSelectCurrency(selectCurr);
    };

    getSelectCurrency();

  }, [symbol]);

  return (
    <ScrollView style={style.wrapper} horizontal={true} >
      <View style={style.container}>
        {filterArray.map((data, index) => <ItemCoinBalance coin={data.coin} amount={data.amount} object={data.priceBalanceInCurrency} navigation={navigation} symbol={symbol} selectCurrency={selectCurrency} key={index} />)}
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

