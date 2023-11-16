import React, { useEffect, useState } from 'react';
import RegisterFunction from '../function/functionReg.js';
import BoxWordItem from '../componens/RegisterBoxWordItems';
import NetInfo from '@react-native-community/netinfo';
import { View, StyleSheet, Image, Text, TouchableOpacity, Clipboard, Alert, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';

import backButton from '../assets/backButton.png';
import Checkbox from '../componens/Checkbox';
import LocalData from '../function/funcionLocalData.js';

const saveUserData = LocalData.saveUserData;

let loadingText = 'Generete Mnemonic';


export function RegistrationScreen({ navigation }) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [arrayMnemonic, setArrayMnemonic] = useState([]);
  const [mnemonicPhrase, setMnemonicPhrase] = useState('');

  // useEffect(() => {
  //   const turnOffLoader = () => {
  //     const timerId = setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //     return () => clearTimeout(timerId);
  //   }

  //   async function fetchData() {
  //     const mnemonicArray = await RegisterFunction.fetchMnemonic();
  //     setArrayMnemonic(mnemonicArray);
  //     turnOffLoader();
  //   };

  //   fetchData();

  // }, []);


  useEffect(() => {
    const turnOffLoader = () => {
      const timerId = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timerId);
    }

    async function fetchData() {
      // Перевірка доступності мережі
      const netInfoState = await NetInfo.fetch();
      if (!netInfoState.isConnected) {
        // Повідомлення користувачеві про відсутність мережі
        loadingText = 'No Internet Connection...\nCheck your internet connection and try again.'
        // Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
        setLoading(true);
        return;
      }

      // Виклик API-запиту тільки при наявності мережі
      const mnemonicArray = await RegisterFunction.fetchMnemonic();
      setArrayMnemonic(mnemonicArray);
      turnOffLoader();
    };

    fetchData();

  }, []);

  useEffect(() => {
    const saveDefoultCurrency = async () => {
      await saveUserData('selectCurrency', `usd`);
    };

    saveDefoultCurrency();

  }, []);

  useEffect(() => {
    setMnemonicPhrase(arrayMnemonic.join(' '));
  }, [arrayMnemonic]);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  const showMyAlert = () => {
    Alert.alert(
      'Mnemonic copied',
      'You can begin the authorization procedure!',
      [
        {
          text: 'Continue', // Текст кнопки
        },
      ]
    );
  };

  return (

    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {loading && (<View style={style.skreenLoaderContainer}>
        <View style={style.loaderTextContainer}>

          <View style={style.loaderContainer}>
            <ActivityIndicator size="large" color="#58FFAF" />
          </View>

          <Text style={style.textLoader}>{loadingText}</Text>
        </View>
      </View>)}

      {!loading && (<View style={style.container}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => { navigation.navigate("StartScreen") }}>
            <Image
              source={backButton}
              style={style.backButton}
              resizeMode="contain">
            </Image>
          </TouchableOpacity>

          <View style={style.registerTextContainer}>
            <Text style={style.registerText}>Mnemonic Generation</Text>
          </View>
        </View >

        <View style={style.mnemonicPhrase}>
          <BoxWordItem array={arrayMnemonic} />
        </View>

        <View style={style.footer}>
          <TouchableOpacity
            onPress={() => { setChecked(!checked) }}
            style={style.checkOut}>
            <Text style={style.saveText}>I SAVED THE PHRASE</Text>
            <View style={{ right: 6 }}>
              <Checkbox
                checked={checked}
                onChange={setChecked}
                buttonStyle={style.checkboxBase}
                activeButtonStyle={style.checkboxChecked}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            console.log(mnemonicPhrase);
            copyToClipboard(mnemonicPhrase);
            showMyAlert();
          }}
          >
            <View style={style.buttonCopy}>
              <Text style={style.copyText}>COPY</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={style.botBox}>
          <TouchableOpacity onPress={() => { checked ? navigation.navigate("Login") : undefined }}>
            <View style={style.buttonNext}>
              <Text style={style.textNext}>NEXT</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>)}
    </SafeAreaView>

  )
};


const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  },

  statusBar: {
    width: 'auto',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    padding: 10
  },

  backButton: {
    padding: 10
  },

  registerTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerText: {
    fontSize: 25,
    fontWeight: '700',
  },

  footer: {
    top: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  buttonCopy: {
    width: 80,
    height: 40,
    right: 16,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkOut: {
    width: 220,
    height: 40,
    borderRadius: 10,
    left: 17,
    backgroundColor: '#58FFAF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  copyText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },

  saveText: {
    left: 12,
    fontSize: 14,
    fontWeight: '700',
  },

  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: '#000000',
  },

  botBox: {
    flex: 0,
    top: 60,
    alignItems: 'center',
  },

  buttonNext: {
    width: 358,
    height: 40,
    backgroundColor: '#58FFAF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textNext: {
    fontWeight: '900'
  },

  skreenLoaderContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },

  loaderContainer: {
    height: 400,
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 15
  },

  loaderTextContainer: {
    height: 'auto',
    width: 'auto',
    alignItems: 'center'
  },

  textLoader: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
});
