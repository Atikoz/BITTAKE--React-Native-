import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import sendIcon from '../assets/send-icon.png';
import getIcon from '../assets/get-icon.png';



const TransactionItem = ({hash, coin, amount, amountInUsd, date, type}) => {
  
  return (
    <View style={style.container}>
      <View style={style.icon}>
        <Image 
        source={type === 'send' ? sendIcon : getIcon}
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
        />
      </View>

      <View style={style.infoTransaction}>
        <View style={style.topContant}>
          <View style={style.hashBox}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {hash.length > 22 ? hash.slice(0, 21) + '...' : hash}
            </Text>
          </View>

          <View style={style.amountUsdtBox}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{amountInUsd}$</Text>
          </View>
        </View>

        <View style={style.botContant}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ paddingRight: 10 }}>{date}</Text>
            <Text>{coin}</Text>
          </View>

          <View style={style.amountBox}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{amount}</Text>
          </View>
        </View>

      </View>
    </View>
  )
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    width: 360
  },

  icon: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  infoTransaction: {
    width: '85%',
    height: '100%',
    paddingTop: 5
  },

  topContant: {
    height: '50%',
    width: '100%',
    flexDirection: 'row',
    justifyContent:'space-between'
  },

  botContant: {
    height: '50%',
    width: '100%',
    flexDirection: 'row',
    justifyContent:'space-between'
  },

  hashBox: {
    justifyContent: 'flex-start',
  },

  amountUsdtBox: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },

  amountBox: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
})

export default TransactionItem;