import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import RegisterFunction from '../function/functionReg.js';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, Alert, StatusBar, SafeAreaView, Modal, Button } from 'react-native';

import backButton from '../assets/backButton.png';
import loginRectangle from '../assets/loginRectangle.png';
import LocalData from '../function/funcionLocalData.js';

import { useTranslation } from 'react-i18next';
import I18n from '../translations/I18n.js';

const saveUserData = LocalData.saveUserData;

export function LoginScreen({ navigation }) {
  const [mnemonic, setMnemonic] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const showMyAlert = (textError) => {
    Alert.alert(
      'Error',
      `${textError}`,
      [
        {
          text: 'Continue', // Текст кнопки
        },
      ]
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const saveDefoultCurrency = async () => {
      await saveUserData('selectCurrency', `usd`);
    };

    saveDefoultCurrency();

  }, []);

  const handlePress = async () => {
    const netInfoState = await NetInfo.fetch();

    if (!netInfoState.isConnected) {
      setModalVisible(true);
      return
    }

    const response = await RegisterFunction.loginUser(mnemonic.trim());

    if (response.status === 'OK') {
      await LocalData.saveUserData('userMnemonic', mnemonic);
      navigation.navigate("MainScreen");
    } else {
      showMyAlert(response.error);
    }
  }

  const translation = useTranslation().t;
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={style.container}>
        <StatusBar barStyle="black-content" backgroundColor="#ffffff" />
        <View style={style.navBar}>
          <TouchableOpacity onPress={() => { navigation.navigate("StartScreen") }}>
            <Image
              source={backButton}
              style={style.backButton}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={style.loginTextContainer}>
            <Text style={style.loginBarText}>{translation('login')}</Text>
          </View>
        </View>

        <View style={style.loginRectangleContainer}>
          <Image
            source={loginRectangle}
            style={style.loginRectangle}
            resizeMode="contain"

          />

          <TextInput
            style={style.mnemonicInput}
            placeholder='Mnemonic'
            placeholderTextColor='#FFFFFF'
            multiline={true}
            onChangeText={setMnemonic}
          />

          <TouchableOpacity
            style={style.buttonLogin}
            onPress={handlePress}>
            <Text style={style.loginText}>{translation('login')}</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}>
            <View style={style.modalContainer}>
              <View style={style.modalContent}>
                <Text style={{ fontSize: 16, fontWeight: 600, textAlign: 'center' }}>{translation('badNetwork')}</Text>
                <View style={{ paddingTop: 10, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Button title="OK" onPress={closeModal} />
                </View>
              </View>
            </View>
          </Modal>

        </View>

      </View>
    </SafeAreaView>
  )
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },

  statusBar: {
    width: 'auto',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },

  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    padding: 10,
  },

  backButton: {
    padding: 10
  },

  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  loginBarText: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  loginTextContainer: {
    flex: 1,
    paddingRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginRectangleContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column'
  },

  loginRectangle: {
    flex: 0,
    position: 'absolute',
    top: 50,
    height: 70,
    width: 360
  },

  buttonLogin: {
    width: 300,
    height: 50,
    top: 180,
    backgroundColor: '#58FFAF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  mnemonicInput: {
    width: 360,
    height: 130,
    top: 140,
    borderRadius: 8,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 14,
    padding: 20,
    paddingTop: 12
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    height: 135,
    width: 350,
    backgroundColor: '#e3e3e3',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  }
});