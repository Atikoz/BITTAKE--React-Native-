import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import TransactionItem from './TransactionItem.js';
import funcionLocalData from '../function/funcionLocalData';
const getUserData = funcionLocalData.getUserData;

const ListTransactions = ({ arrayTransactions, arrayCoinBalance, symbol }) => {
  const [selectCurrency, setSelectCurrency] = useState([]);


  useEffect(() => {
    const getSelectCurrency = async () => {
      const selectCurr = await getUserData('selectCurrency');
      setSelectCurrency(selectCurr);
    };

    getSelectCurrency();

  }, [symbol]);

  const priceInCurrency = {};

  for (const item of arrayCoinBalance) {
    if (item.status) {
      priceInCurrency[item.coin] = {
        usd: item.priceInCurrency.usd,
        eur: item.priceInCurrency.eur,
        rub: item.priceInCurrency.rub
      };
    }
  }

  return (
    <ScrollView style={style.wrapper} horizontal={false} >
      {arrayTransactions.length === 0 ? (<View style={{ paddingTop: 20, alignItems: 'center' }}><Text style={{ fontSize: 18, fontWeight: '600' }}>No transactions found</Text></View>) : (
        <View style={style.container}>
          {arrayTransactions.map((data, index) => <TransactionItem
            hash={data.hash}
            coin={data.coin}
            amount={data.amount}
            date={data.date}
            type={data.type}
            symbol={symbol}
            priceInCurrency={priceInCurrency}
            selectCurr={selectCurrency}
            key={index} />)}
        </View>
      )}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  wrapper: {
    flex: 0,
  },

  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ListTransactions;