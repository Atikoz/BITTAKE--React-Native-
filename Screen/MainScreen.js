import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Linking, RefreshControl, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import logo from '../assets/logo.png';
import Carusel from '../componens/CoinCarusel.js';
import InfoUser from '../function/functionGetInfoUser';
import ListTransactions from '../componens/ListTransactions';

const infoUserInstance = new InfoUser();

export function MainScreen({navigation}) {
  const [allMoney, setAllMoney] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [arrayCoinBalance, setArrayCoinBalance] = useState([]);
  const [arrayTransactions, setArrayTransactions] = useState([]);


  useEffect(() => {
    async function updateUserInfo() {
      const updateInfo = await infoUserInstance.UpdateInfoUser();
      setArrayCoinBalance(updateInfo.coinBalance);
      setArrayTransactions(updateInfo.userTransactions.data);
    }

    const usdSum = [];
    arrayCoinBalance.map((a) => {usdSum.push(a.amountInUsd)});
    const allMoney = usdSum.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setAllMoney(allMoney);
  

    const intervalId = setInterval(updateUserInfo, 20000);
  
    updateUserInfo();
  
    return () => clearInterval(intervalId);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function updateUserInfo() {
      const updateInfo = await infoUserInstance.UpdateInfoUser();
      setArrayCoinBalance(updateInfo.coinBalance);
      setArrayTransactions(updateInfo.userTransactions.data);
    }

    const usdSum = [];
    arrayCoinBalance.map((a) => {usdSum.push(a.amountInUsd)});
    const allMoney = usdSum.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setAllMoney(allMoney);
  
    updateUserInfo();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const handlePress = () => {
    const url = 'https://www.bestchange.ru/?p=1293691';

    Linking.openURL(url).catch((err) => console.error('Не удалось открыть URL:', err));
  };


  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <StatusBar barStyle="light-content" backgroundColor="#000000"/>
      <ScrollView
        contentContainerStyle={style.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ backgroundColor: 'black' }} tintColor="#58FFAF" colors={["#58FFAF"]} />
        }>

        <View style={style.headerBox}>
          <Image
            source={logo}
            style={{ width: 160, height: 30 }} 
            resizeMode="contain"
          />
        </View>

        <View style={style.maimRectangle}>
          <View style={style.totalBalance}>
            <Text style={style.textTotalBalance}>{allMoney}$</Text>
          </View>

          <View style={style.whiteRectangle}>
            <View style={style.coinBalanceContainer}>
              <Carusel array={arrayCoinBalance} navigation={navigation}/>
            </View>

            <View style={style.transactionContainer}>
              <View style={{ left: 25, justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '900' }}>Recent Transactions</Text>
              </View>

              <ListTransactions array={arrayTransactions}/>

            </View>
          </View>

          <View style={style.footer}>
            <TouchableOpacity 
              style={{ height: 50, width: 150, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: 25}}
              onPress={handlePress}>
              <Text style={{ fontWeight: '900', fontSize: 16 }}>BUY</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ height: 50, width: 150, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginRight: 25}}
              onPress={handlePress}>
              <Text style={{ fontWeight: '900', fontSize: 16, color: 'white' }}>SELL</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container:{
    backgroundColor: 'black',
    width: '100%',
    height: 800,
    flexDirection: 'column'
  },

  statusBar: {
    width:'auto',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },

  headerBox: {
    width:'auto',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  maimRectangle: {
    backgroundColor: '#58FFAF',
    width: 'auto',
    height: '100%',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },

  totalBalance: {
    width:'auto',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textTotalBalance: {
    fontSize: 33,
    fontWeight: '900'
  }, 

  whiteRectangle: {
    backgroundColor: 'white',
    width: 'auto',
    height: '60%',
    borderRadius: 60,
  },

  coinBalanceContainer: {
    width: 'auto',
    height: 200,
    padding: 15,
    justifyContent: 'flex-end',
  },

  transactionContainer: {
    width: 'auto',
    height: '54%',
  },

  footer: {
    flexDirection: 'row',
    height: 80,
    width: 'auto',
    justifyContent: 'space-between', 
    alignItems: 'center'
  },



})