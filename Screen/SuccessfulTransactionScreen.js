import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Clipboard, StatusBar, SafeAreaView } from 'react-native';

import { useTranslation } from 'react-i18next';

import successfullIcon from '../assets/succesfull-icon.png';
import logo from '../assets/black-logo.png'


export function SuccessfulTransactionScreen ({ route, navigation}) {
  const { hash, transferAmount, transferAddress, coin, transferComission, coinCommission} = route.params;

  const translation = useTranslation().t;


  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View style={style.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000000"/>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Image 
          source={logo}
          style={{ width: 160, height: 30 }} 
          resizeMode="contain"/>
        </View>

        <View style={style.successfullContainer}>
          <Image 
            source={successfullIcon}
            style={{ width: 160, height: 200 }} 
            resizeMode="contain"/>
        </View>

        <View style={style.hashInfoContainer}>
          <View style={style.hashInfo}>
              <View style={{ justifyContent: 'center', }}>
                <Text style={style.textStyle}>TX Hash:</Text>
                <Text style={style.textStyle}>{hash}</Text>
              </View>

              <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity style={style.copyButton} onPress={ () => {copyToClipboard(hash)}}>
                  <Text style={{color: 'white', fontWeight: '900'}}>{translation('copy')}</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>

        <View style={style.addressSendContainer}>
          <View style={style.transferAddress}>
            <Text style={style.textStyle}>{translation('addressSend')}:</Text>
            <Text style={style.textStyle}>{transferAddress}</Text>
          </View>
        </View>

        <View style={style.addressSendContainer}>
          <View style={style.transferAddress}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', height: '50%', alignItems: 'center'}}>
              <Text style={style.textStyle}>{translation('amountSend')}:</Text>
              <Text style={style.textStyle}> {transferAmount} {coin.toUpperCase()}</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '50%'}}>
              <Text style={style.textStyle}>{translation('comissionSend')}:</Text>
              <Text style={style.textStyle}> {transferComission} {coinCommission.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        <View style={style.sendCoinContainer}>
            <View style={style.footerRectangle}>
              <TouchableOpacity 
                style={style.homeButton}
                onPress={async () => {navigation.navigate("MainScreen")}}
              >
                <Text style={{ fontSize: 17, fontWeight: '900' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>

      </View>
    </SafeAreaView>
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

  successfullContainer: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  hashInfoContainer: {
    height: '17%',
    width: '100%',
    marginTop: 10,
    alignItems: 'center'
  },

  hashInfo: {
    height: '100%',
    width: '95%',
    borderRadius: 25,
    backgroundColor: '#58FFAF',
    padding: 15,
  },

  textStyle: {
    fontWeight: '900',
    fontSize: 15,
    paddingBottom: 5
  },

  addressSendContainer: {
    height: '10%',
    width: '100%',
    marginTop: 15,
    alignItems: 'center'
  },

  copyButton: {
    height: 40,
    width: 70,
    borderWidth: 2,
    borderRadius: 13,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },

  sendCoinContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  transferAddress: {
    height: '100%',
    width: '95%',
    borderRadius: 25,
    backgroundColor: '#58FFAF',
    padding: 15,
    justifyContent: 'center'
  },

  footerRectangle: {
    height: 140,
    width: '100%',
    backgroundColor: 'black',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  homeButton: {
    height: 60,
    width: '60%',
    borderRadius: 15,
    backgroundColor: '#58FFAF',
    justifyContent: 'center',
    alignItems: 'center'
  },
});