import React, { useState, useEffect } from 'react';
import InfoUser from '../function/functionGetInfoUser';
import { Formik } from 'formik';
import * as yup from 'yup';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, StatusBar, SafeAreaView, Button } from 'react-native';

import backButton from '../assets/backButton.png';
import { SendCoin } from '../function/functionTransfer';
const infoUserInstance = new InfoUser();

const circumcisionUsd = (sum) => {
  return Math.trunc(sum * 1e2) / 1e2
};

const circumcisionAmount = (sum) => {
  return Math.trunc(sum * 1e5) / 1e5
};

export function SendCoinScreen({route, navigation}) {
  const { coin } = route.params;
  const [userToken, setUserToken] = useState([]);
  const [userWallet, setUserWallet] = useState([]);
  const [userBalance, setUserBalance] = useState([]);
  const [userBalanceUsd, setUserBalanceUsd] = useState([]);
  const [priceToUsd, setPriceToUsd] = useState([]);
  const [coinCommission, setCoinComission] = useState();
  const [transferComission, setTransferComission] = useState([]);
  const [amountSend, setAmountSend] = useState(0);
  const [unixTimestamp, setUnixTimestamp] = useState();
  const [networkCoin, setNetworkCoin] = useState([]);
  const [minimalTransferAmount, setMinTransferAmount] = useState([]);

  const validationSchema = yup.object().shape({
    address: yup.string()
    .required('Required field')
    .notOneOf([userWallet], 'You cannot transfer funds to your address!'),
    amount: yup.number()
    .required('Required field')
    .min(minimalTransferAmount, 'Transfer amount is below the minimum!')
    .max(userBalance - transferComission, 'Insufficient funds on balance!')
  });

  useEffect(() => {
    async function updateUserToken() {
      const updateUserToken = await infoUserInstance.getUserToken();
      setUserToken(updateUserToken);
    }

    const intervalId = setInterval(updateUserToken, 20000);
  
    updateUserToken();
  
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {

    async function coinBalance() {
      const coinBalance = await infoUserInstance.getBalanceUser(coin);
      setUserBalance(coinBalance[0].amount);
      setUserBalanceUsd(coinBalance[0].amountInUsd);
      setPriceToUsd(coinBalance[0].priceToUsd);
      setTransferComission(coinBalance[0].amountCommission);
      setCoinComission(coinBalance[0].coinComission);
      setNetworkCoin(coinBalance[0].network);
      setMinTransferAmount(coinBalance[0].minimumWithdrawalAmount);
    }

    coinBalance();

    async function getUserWallet() {
      const userWallet = await infoUserInstance.getUserWallet(userToken);
      if (coin === 'tron' || coin === 'usdt') {
        setUserWallet(userWallet.trc.address);
      } else {
        setUserWallet(userWallet[coin].address);
      }
    }

    getUserWallet();
  },[userToken]);

  const handleSubmit = (values) => {
    // Обработка отправки формы
    console.log(values);
    const currentDate = new Date();
    setUnixTimestamp(Math.floor(currentDate.getTime() / 1000));

    async () => {
      let request;
      const transferAmount = values.amount;
      const transferAddress = values.address;
      console.log(coin, transferAmount, userToken, transferAddress, unixTimestamp);
      
      request = await SendCoin(coin, transferAmount, userToken, transferAddress, unixTimestamp);
      console.log(request);
      if (request && request.status === 'OK') {
        const hash = request.data.hash;
        navigation.navigate("SuccessfulTransactionScreen", {hash, transferAmount, transferAddress, coin, transferComission, coinCommission});
      } else {
        console.log('status error');
      }
    }
  };
 
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{backgroundColor: 'black'}}>
        <View style={style.container}>
          <StatusBar barStyle="light-content" backgroundColor="#000000"/>
          
          <View style={style.header}>
            <View style={style.backButton}>
              <TouchableOpacity onPress={ () => {navigation.navigate("MainScreen")}}>
                  <Image
                    source={backButton}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
            </View>

            <View style={style.headerText}>
              <Text style={{ fontSize: 18, fontWeight: '900' }}>Send {coin.toUpperCase()}</Text>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <View style={style.amountContainer}>
              <View style={style.topContent}>
                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 20, fontWeight: '900' }}>{circumcisionAmount(userBalance)} {coin.toUpperCase()}</Text>
                </View>

                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 20, fontWeight: '900' }}>{circumcisionUsd(userBalanceUsd)}$</Text>
                </View>
              </View>

              <View style={style.topContent}>
                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 19, fontWeight: '900' }}>Price:  {circumcisionUsd((priceToUsd * amountSend))}$</Text>
                </View>
              </View>

              <View style={style.topContent}>
                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 19, fontWeight: '900' }}>Commision transfer: {circumcisionAmount(transferComission)} {coin.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={style.inputContain}>
            <Formik
              initialValues={{ address: '', amount: `` }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <View>
                  <TextInput
                    onChangeText={(text) => {
                      const cleanedText = text.trim();
                      handleChange('address')(cleanedText)

                    }}
                    onBlur={handleBlur('address')}
                    value={values.address}
                    multiline={true}
                    placeholder="Wallet address"
                    placeholderTextColor='#858383'
                    style={style.walletInput}
                    />
                  {touched.address && errors.address && <Text style={{color: 'red', fontWeight: '700'}}>{errors.address}</Text>}
                </View>

                <View style={{marginTop: 15}}>
                  <TextInput
                    style={style.amountInput}
                    onBlur={handleBlur('amount')}
                    value={values.amount}
                    placeholder="Amount send"
                    placeholderTextColor='#858383'
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      // Заменяем запятую на точку и обновляем значение в состоянии формы
                      const cleanedText = text.replace(',', '.');
                      setAmountSend(cleanedText)
                      handleChange('amount')(cleanedText);
                    }}
                  />
                  {touched.amount && errors.amount && <Text style={{color: 'red', fontWeight: '700'}}>{errors.amount}</Text>}
                </View>

                <View style={{ top: 350, position: 'absolute', height: 100, width: '100%', right: -15}}>
                  <View style={style.footerRectangle} />
                </View>

                <View style={{ top: 300, position: 'absolute', height: 100, width: '90%', alignItems: 'center'}}>
                  <TouchableOpacity 
                    style={style.sendCoinButton}
                    onPress={handleSubmit}>
                    <Text style={{ fontSize: 17, fontWeight: '900' }}>SEND COIN</Text>
                  </TouchableOpacity>
                </View>

                
              </View>
              )}
            </Formik>

            <View style={style.infoRectangle}>
              <View style={style.blackRectangle}>

                <View style={{ paddingLeft: 10 }}>
                  <Text style={style.infoTextStyle}>Network:   {networkCoin}</Text>
                </View>

                <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                  <Text style={style.infoTextStyle}>Minimal transfer amount:   {minimalTransferAmount} {coin.toUpperCase()}</Text>
                </View>
              
              </View>
            </View>

          </View>

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
};

const style = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    width: 'auto',
    height: '100%',
    flexDirection: 'column'
  },

  statusBar: {
    width:'auto',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },

  header: {
    height: 70,
    width: 'auto',
    flexDirection: 'row',
  },

  backButton: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerText: {
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    paddingLeft: 60
  },

  amountContainer: {
    height: 150,
    width: '95%',
    borderWidth: 2,
    borderRadius: 10,
  },

  topContent: {
    height: '33%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  inputContain: {
    marginTop: 35,
    height: '75%',
    width: '100%',
    alignItems: 'center',
  },

  walletInput: {
    height: 40,
    width: 360,
    color: 'white',
    borderRadius: 10,
    backgroundColor: 'black',
    padding: 10,
    paddingTop: 10,
  },

  amountInputContainer: {
    height: 40,
    width: '95%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  amountInput: {
    height: 40,
    width: 360,
    color: 'white',
    borderRadius: 10,
    backgroundColor: 'black',
    paddingLeft: 10
  },

  sendCoinContainer: {
    height: '45%',
    width: '100%',
    justifyContent: 'flex-end',
  },

  sendCoinButton: {
    top: 100,
    height: 60,
    width: 180,
    borderRadius: 15,
    backgroundColor: '#58FFAF',
    justifyContent: 'center',
    alignItems: 'center'
  },

  footerRectangle: {
    height: 170,
    width: '100%',
    backgroundColor: 'black',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  infoRectangle: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  blackRectangle: {
    height: 80,
    width: '95%',
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center'
  },

  infoTextStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 17
  }

})