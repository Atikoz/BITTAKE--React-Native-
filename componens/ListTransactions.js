import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import TransactionItem from './TransactionItem.js';

const ListTransactions = ({ array }) => {
  console.log('array:', array);

  return (
    <ScrollView style={style.wrapper} horizontal={false} >
      {array.length === 0 ? (<View style={{ paddingTop: 20, alignItems: 'center' }}><Text style={{ fontSize: 18, fontWeight: '600' }}>No transactions found</Text></View>) : (
        <View style={style.container}>
          {array.map((data, index) => <TransactionItem
            hash={data.hash}
            coin={data.coin}
            amount={data.amount}
            amountInUsd={data.amountInUsd}
            date={data.date}
            type={data.type}
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