import React, { useState, useEffect } from 'react';
import InfoUser from '../function/functionGetInfoUser';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, StatusBar, SafeAreaView } from 'react-native';

import backButton from '../assets/backButton.png';
import { SendCoin } from '../function/functionTransfer';
const infoUserInstance = new InfoUser();


export function SendCoinScreen({route, navigation}) {
  const { coin } = route.params;
  const [addressSend, setAddressSend] = useState();
  const [userToken, setUserToken] = useState([]);
  const [userWallet, setUserWallet] = useState([]);
  const [userBalance, setUserBalance] = useState([]);
  const [userBalanceUsd, setUserBalanceUsd] = useState([]);
  const [priceToUsd, setPriceToUsd] = useState([]);
  const [coinCommission, setCoinComission] = useState();
  const [transferComission, setTransferComission] = useState([]);
  const [maxAmount, setMaxAmount] = useState(0);
  const [inputTrue, setInputTrue] = useState(false);
  const [unixTimestamp, setUnixTimestamp] = useState();
  const [networkCoin, setNetworkCoin] = useState([]);
  const [minimalTransferAmount, setMinTransferAmount] = useState([]);

  
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

  useEffect(() => {

    console.log(maxAmount);
    console.log(userBalance);
    console.log(transferComission);

    if (transferComission.length === 0) return
    if (coin === coinCommission) setTransferComission(0)
    if(maxAmount > (userBalance - transferComission)) {
      setInputTrue(false);
    } else {
      setInputTrue(true);
      const currentDate = new Date();
      setUnixTimestamp(Math.floor(currentDate.getTime() / 1000))
    }
  }, [maxAmount])

  useEffect(() => {

    if (!addressSend) return
    if(userWallet === addressSend) {
      setInputTrue(false)
    } else {
      setInputTrue(true)
    }
  }, [addressSend]);

 
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
                  <Text style={{ fontSize: 20, fontWeight: '900' }}>{userBalance} {coin.toUpperCase()}</Text>
                </View>

                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 20, fontWeight: '900' }}>{userBalanceUsd}$</Text>
                </View>
              </View>

              <View style={style.topContent}>
                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 19, fontWeight: '900' }}>Price:  {(priceToUsd * maxAmount).toFixed(3)}$</Text>
                </View>
              </View>

              <View style={style.topContent}>
                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 19, fontWeight: '900' }}>Commision transfer: {transferComission} {coin.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={style.inputContain}>
            <TextInput
              style={style.walletInput}
              placeholder='address'
              placeholderTextColor='#FFFFFF'
              multiline={true}
              onChangeText={ (text) => {
                setAddressSend(text.trim())
              }}
            />

            <View style={{height: 13, width: 'auto', alignItems: 'center'}}>
              {userWallet === addressSend ? (<Text style={{ color: 'red', fontWeight: '600' }}>You cannot transfer funds to your address!</Text>) : undefined}
            </View>

            <View style={style.amountInputContainer}>
              <TextInput
                style={style.amountInput}
                placeholder='amount'
                value={maxAmount}
                placeholderTextColor='#FFFFFF'
                keyboardType="numeric"
                onChangeText={ (text) => {
                  const cleanetText = text.replace(',', '.');
                  setMaxAmount(cleanetText)
                }}
              />

              <TouchableOpacity 
                style={{height: 40, width: 40, position: 'absolute', right: 10, justifyContent: 'center'}}
                onPress={ () => {
                  let sum = null;
                  {userBalance < transferComission ? sum = 0 : sum = userBalance - transferComission}
                  setMaxAmount(sum.toString())}}
              >
                <Text style={{color: 'white', fontWeight: '900'}}>MAX</Text>
              </TouchableOpacity>
            </View>
  
            {minimalTransferAmount > maxAmount ? 
            (<View style={style.footer}>
                <Text style={{ color: 'red', fontWeight: '600' }}>Transfer amount is below the minimum!</Text>
              </View>) : (<View style={style.footer}/>)}


            {maxAmount > (userBalance - transferComission) ? 
              (<View style={style.footer}>
                <Text style={{ color: 'red', fontWeight: '600' }}>Insufficient funds on balance!</Text>
              </View>) : (<View style={style.footer}/>)}

          </View>

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

          <View style={style.sendCoinContainer}>
            <View style={style.footerRectangle}>
              <TouchableOpacity 
                style={style.sendCoinButton}
                onPress={async () => {
                  let request;
                
                  if (inputTrue) {
                    request = await SendCoin(coin, maxAmount, userToken, addressSend, unixTimestamp);
                    console.log(request);
                    if (request && request.status === 'OK') {
                      const hash = request.data.hash;
                      navigation.navigate("SuccessfulTransactionScreen", {hash, maxAmount, addressSend, coin, transferComission, coinCommission});
                    } else {
                      console.log('status error');
                    }
                  }
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: '900' }}>SEND COIN</Text>
              </TouchableOpacity>
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
    marginTop: 15,
    height: 180,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  walletInput: {
    height: 40,
    width: '95%',
    color: 'white',
    borderRadius: 10,
    backgroundColor: 'black',
    padding: 10,
    paddingTop: 10
  },

  amountInputContainer: {
    height: 40,
    width: '95%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  amountInput: {
    height: 40,
    width: '100%',
    color: 'white',
    borderRadius: 10,
    backgroundColor: 'black',
    paddingLeft: 10
  },

  sendCoinContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  sendCoinButton: {
    height: 60,
    width: '60%',
    borderRadius: 15,
    backgroundColor: '#58FFAF',
    justifyContent: 'center',
    alignItems: 'center'
  },

  footerRectangle: {
    height: 160,
    width: '100%',
    backgroundColor: 'black',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  footer: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15
  },

  infoRectangle: {
    height: 150,
    width: '100%',
    justifyContent: 'flex-end',
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