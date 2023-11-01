import React, { useState, useRef, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import LocalData from '../function/funcionLocalData.js';
import RBSheet from "react-native-raw-bottom-sheet";
import InfoUser from '../function/functionGetInfoUser';

import { View, StyleSheet, Image, Text, TouchableOpacity, StatusBar, SafeAreaView, Modal, Linking, Button } from 'react-native';


import mailLogo from '../assets/mail.png';
import worldLogo from '../assets/world.png';
import currencyLogo from '../assets/currency.png';
import logoutIcon from '../assets/log-out-icon.png';
import telegramLogo from '../assets/telegram-logo.png';
import backButton from '../assets/backButton.png';
import funcionLocalData from '../function/funcionLocalData';

const saveUserData = LocalData.saveUserData;
const getUserData = LocalData.getUserData;
const removeLocalData = funcionLocalData.removeData;
const infoUserInstance = new InfoUser();


export function SettingsScreen({navigation}) {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, onCurrencySelect] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [userToken, setUserToken] = useState([]);


  const handleCurrencySelect = async (currency) => {
    await saveUserData('selectCurrency', `${currency}`)
    onCurrencySelect(currency);
    refRBSheet.current.close();
  };

  useEffect(() => {
    const updateUserToken = async () => {
      const updateUserToken = await infoUserInstance.getUserToken();
      setUserToken(updateUserToken);
    };

    const intervalId = setInterval(updateUserToken, 20000);
  
    updateUserToken();
  
    return () => clearInterval(intervalId);
  }, [])

  useEffect(() => {
    const giveSelectedCurrency = async () => {
      const currenciesSelected = await getUserData('selectCurrency');
      console.log('selected currency', currenciesSelected);
      onCurrencySelect(currenciesSelected);
    };

    giveSelectedCurrency();
  }, [])

  useEffect(() => {

    async function getCurrencyList() {
      const currencyList = await infoUserInstance.GetCurrencyList(userToken);
      setCurrencies(currencyList);
    };

    getCurrencyList();
  }, [userToken])

  const refRBSheet = useRef();


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleConfirmLogout = async () => {
    await userLogOut();
    navigation.navigate("StartScreen")
  }

  const userLogOut = React.useCallback(async () => {
    await removeLocalData('userMnemonic');
    console.log('data removed');
  }, []);

  const handlePressTelegram = () => {
    const url = 'https://t.me/kupit_bitkoin_bitcoinRFSNG';

    Linking.openURL(url).catch((err) => console.error('Не удалось открыть URL:', err));
  };

  const handlePressMail = () => {
    const url = "mailto:walletmanagerbtc@gmail.com";

    Linking.openURL(url).catch((err) => console.error('Не удалось открыть URL:', err));
  };



  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <StatusBar barStyle="light-content" backgroundColor="#000000"/>
      <View style={style.container}>
        <View style={style.header}>
          <TouchableOpacity style={style.backButtonContainer} onPress={() => {navigation.navigate("MainScreen")}}>
            <Image
              source={backButton}
              style={{ paddingTop: 12 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <View style={style.headerText}>
            <Text style={{ fontWeight:'900', fontSize: 16}}>Settings</Text>
          </View>
        </View>

        <View style={style.settingsContain}>
          <View style={style.itemSettings}>
            <View style={style.itemLang}>
              <View>
                <Image 
                source={currencyLogo}
                style={{ width: 25, height: 25 }} 
                resizeMode="contain"
                />
              </View>

              <View style={{paddingLeft: 5}}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>Currency</Text>
              </View>
            </View>

            <TouchableOpacity onPress={ () => {
              refRBSheet.current.open()}}> 
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                  wrapper: {
                    backgroundColor: "transparent"
                  },
                  draggableIcon: {
                    width: 50,
                    backgroundColor: "white"
                  },
                  container: {
                    backgroundColor: 'black',
                    borderTopStartRadius: 40,
                    borderTopEndRadius: 40
                  }
                }}
              >

                <View>
                  <Text style={{ color: 'white', fontSize: 22, fontWeight: '900', textAlign: 'center' }}>
                    Select Currency
                  </Text>
                  {currencies.map((currency) => (
                    <TouchableOpacity
                      key={currency}
                      onPress={() => handleCurrencySelect(currency)}
                      style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: 'white', alignItems: 'center' }}
                    >
                      <Text style={{ color: 'white', fontSize: 18 }}>{currency.toUpperCase()}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

              </RBSheet>
              
            <View>
              <Text style={{fontSize: 16, fontWeight: '600'}}>{selectedCurrency}</Text>
            </View>
            </TouchableOpacity>

          </View>

          <View style={style.itemSettings}>
            <View style={style.itemLang}>
              <View>
                <Image 
                source={worldLogo}
                style={{ width: 25, height: 25 }} 
                resizeMode="contain"
                />
              </View>

              <View style={{paddingLeft: 5}}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>Language</Text>
              </View>
            </View>

            <View>
              <Text style={{fontSize: 16, fontWeight: '600'}}>English</Text>
            </View>
          </View>

          <TouchableOpacity onPress={openModal} style={style.itemLogout}>
            <View>
              <Image 
              source={logoutIcon}
              style={{ width: 30, height: 30 }} 
              resizeMode="contain"
              />
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}>
              <View style={style.modalContainer}>
                <View style={style.modalContent}>
                  <Text style={{ fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Are you sure you want to log out of your account?</Text>
                  <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', width: '75%' }}>
                    <Button title="Continue" onPress={handleConfirmLogout} />
                    <Button title="Cancel" onPress={closeModal} />
                  </View>
                </View>
              </View>
            </Modal>

            <View>
              <Text style={{fontSize: 16, fontWeight: '600'}}>Logout</Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={style.socialNetwork}>
          <View style={style.textContainer}>
            <Text style={{ fontSize: 16, fontWeight: '900' }}>Social Network</Text>
          </View>
          
          <TouchableOpacity onPress={handlePressTelegram} style={style.socItem}>
            <Image 
              source={telegramLogo}
              resizeMode="contain"
              style={{ height: 30, width: 30}}
              />
              <View style={{paddingLeft: 2}}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>Telegram</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressMail} style={style.socItem}>
            <Image 
              source={mailLogo}
              resizeMode="contain"
              style={{ height: 30, width: 30}}
              />
              <View style={{paddingLeft: 5}}>
                <Text style={{fontSize: 16, fontWeight: '700'}}>Gmail</Text>
              </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    width: '100%',
    height: 800,
  },

  backButton: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  backButtonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '18%'
  },

  headerText: { 
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
    width: '55%'
  },

  settingsContain: {
    height: 'auto',
    width: '100%',
    marginTop: 20,
  },
  
  itemSettings: {
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemLogout: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemLang: {
    height: 40,
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  socialNetwork: {
    height: "auto",
    width: '100%',
    marginTop: 25
  },

  textContainer: {
    height: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  socItem: {
    height: 50,
    width: '100%',
    paddingLeft: 10,
    flexDirection: 'row',
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