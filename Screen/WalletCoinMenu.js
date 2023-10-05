import React, { useState, useEffect } from 'react';
import QRCode from 'react-native-qrcode-svg';
import InfoUser from '../function/functionGetInfoUser';
import { View, Text, StyleSheet, Image, TouchableOpacity, Clipboard, Alert } from 'react-native';

import backButton from '../assets/backButton.png';
const infoUserInstance = new InfoUser();


export function WalletCoinMenuScreen({ route, navigation }) {
  const { coin } = route.params;
  const [userWallet, setUserWallet] = useState([]);
  const [userBalance, setUserBalance] = useState([]);
  const [userBalanceUsd, setUserBalanceUsd] = useState([]);
  

  useEffect(() => {

    async function coinBalance() {
      const coinBalance = await infoUserInstance.getBalanceUser(coin);
      setUserBalance(coinBalance[0].amount);
      setUserBalanceUsd(coinBalance[0].amountInUsd)
    }

    const intervalId = setInterval(coinBalance, 20000);

    coinBalance();

    async function getUserWallet() {
      const userWallet = await infoUserInstance.getUserWallet();
      if (coin === 'tron' || coin === 'usdt') {
        setUserWallet(userWallet.trc.address);

      } else {
        setUserWallet(userWallet[coin].address);
      }
    }

    getUserWallet();

    return () => clearInterval(intervalId);

  },[]);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  const showMyAlert = () => {
    Alert.alert(
      'Address copied',
      'You can continue your operation!', //Текст сообщения
      [
        {
          text: 'Continue', // Текст кнопки
        },
      ]
    );
  };


  return (
    <View style={style.container}>
      <View style={style.statusBar} />

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
          <Text style={{ fontSize: 18, fontWeight: '900' }}>{coin.toUpperCase()} Wallet</Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <View style={style.amountContainer}>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: '900' }}>{userBalance} {coin.toUpperCase()}</Text>
          </View>

          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: '900' }}>{userBalanceUsd}$</Text>
          </View>
        </View>
      </View>

      <View style={style.receiptInformation}>
          <View style={style.receiptInformationRectangle}>
            <Text style={style.infoText}>To replenish your balance, transfer the desired replenishment amount to this account.</Text>
          </View>
        </View>

      <View style={style.qrCodeContainer}>
        <QRCode value={userWallet} size={200} />
      </View>

      <View style={style.addressContainer}>
        <View style={style.userWallet}>
          <Text style={{ fontSize: 13, fontWeight: '900' }}>{userWallet}</Text>
        </View>

        <View style={style.copyButtonContainer}>
          <TouchableOpacity 
            style={style.copyButton}
            onPress={ () => {
              copyToClipboard(userWallet);
              showMyAlert();
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: '900' }}>COPY ADDRESS</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.sendCoinContainer}>
        <View style={style.footerRectangle}>
          <TouchableOpacity 
            style={style.sendCoinButton}
            onPress={ () => {navigation.navigate("SendCoinScreen", { coin })}}
          >
            <Text style={{ fontSize: 17, fontWeight: '900' }}>SEND COIN</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
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
    height: 80,
    width: '95%',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  addressContainer: {
    height: 150,
    width: '100%',
  },

  userWallet: {
    height: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  copyButtonContainer: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  copyButton: {
    height: 50,
    width: '50%',
    borderRadius: 20,
    backgroundColor: '#58FFAF',
    justifyContent: 'center',
    alignItems: 'center'
  },

  receiptInformation: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  receiptInformationRectangle: {
    flex: 0,
    backgroundColor: 'black',
    borderRadius: 15
  },

  infoText: {
    padding: 15,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },

  qrCodeContainer: {
    flex: 0,
    paddingTop: 10,
    alignItems: 'center'
},

  sendCoinContainer: {
    flex: 1,
    justifyContent: 'flex-end'
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
  }
});