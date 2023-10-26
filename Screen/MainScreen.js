import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Linking, RefreshControl, ScrollView, StatusBar, SafeAreaView, Dimensions, Modal, Button } from 'react-native';
import logo from '../assets/logo.png';
import logoutIcon from '../assets/log-out-icon.png';
import Carusel from '../componens/CoinCarusel.js';
import InfoUser from '../function/functionGetInfoUser';
import ListTransactions from '../componens/ListTransactions';
import funcionLocalData from '../function/funcionLocalData';

const infoUserInstance = new InfoUser();
const removeLocalData = funcionLocalData.removeData;
const { width, height } = Dimensions.get('window');


export function MainScreen({navigation}) {
  const [allMoney, setAllMoney] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [arrayCoinBalance, setArrayCoinBalance] = useState([]);
  const [arrayTransactions, setArrayTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const circumcisionNumber = (sum) => {
    return Math.trunc(sum * 1e2) / 1e2
  }

  useEffect(() => {
    async function updateUserInfo() {
      const updateInfo = await infoUserInstance.UpdateInfoUser();
      setArrayCoinBalance(updateInfo.coinBalance);
      setArrayTransactions(updateInfo.userTransactions.data);

    const usdSum = [];
    updateInfo.coinBalance.forEach((a) => {usdSum.push(a.amountInUsd)});
    const allMoney = usdSum.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setAllMoney(allMoney);
    }


    const intervalId = setInterval(updateUserInfo, 20000);
  
    updateUserInfo();
  
    return () => clearInterval(intervalId);
  }, []);

  const userLogOut = React.useCallback(() => {
    removeLocalData('userMnemonic').then(async () => {console.log('data removed');});
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function updateUserInfo() {
      const updateInfo = await infoUserInstance.UpdateInfoUser();
      setArrayCoinBalance(updateInfo.coinBalance);
      setArrayTransactions(updateInfo.userTransactions.data);

      const usdSum = [];
      updateInfo.coinBalance.forEach((a) => {usdSum.push(a.amountInUsd)});
      const allMoney = usdSum.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setAllMoney(allMoney);
    }
  
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

          <TouchableOpacity onPress={openModal}>
            <Image 
            source={logoutIcon}
            style={{ width: 70, height: 30 }} 
            resizeMode="contain"
            />
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={style.modalContainer}>
              <View style={style.modalContent}>
                <Text style={{ fontSize: 16, fontWeight: 600, textAlign: 'center'}}>Are you sure you want to log out of your account?</Text>
                <View style={{paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', width: '75%'}}>
                  <Button title="Continue" onPress={() => {
                    userLogOut();
                    navigation.navigate("StartScreen");
                  }} />
                  <Button title="Cancel" onPress={closeModal} />
                </View>
                
              </View>
            </View>
          </Modal>

        </View>

        <View style={style.maimRectangle}>
          <View style={style.totalBalance}>
            <Text style={style.textTotalBalance}>{circumcisionNumber(allMoney)}$</Text>
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
    width:'100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    height: 120,
    width: 350,
    backgroundColor: '#e3e3e3',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  }

})