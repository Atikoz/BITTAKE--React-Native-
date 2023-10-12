import React, {useEffect, useState} from 'react';
import RegisterFunction from '../function/functionReg.js';
import BoxWordItem from '../componens/RegisterBoxWordItems';
import { View, StyleSheet, Image, Text, TouchableOpacity, Clipboard, Alert, Platform } from 'react-native';

import backButton from '../assets/backButton.png';
import Checkbox from '../componens/Checkbox';

export function RegistrationScreen ({ navigation }) {
  const [checked, setChecked] = useState(false);
  const [arrayMnemonic, setArrayMnemonic] = useState([]);
  const [mnemonicPhrase, setMnemonicPhrase] =useState('');
  
  useEffect(() => {
    async function fetchData() {
      const mnemonicArray = await RegisterFunction.fetchMnemonic();
      setArrayMnemonic(mnemonicArray);
    };

    fetchData();
  }, []);

  useEffect ( () => {
    setMnemonicPhrase(arrayMnemonic.join(' '))
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

  const OS = Platform.OS;


  return(
    <View style={style.container}>
      { OS === 'ios' ? ( <View style={style.statusBar} /> ) : undefined }
      <View style={style.header}>
        <TouchableOpacity onPress={ () => {navigation.navigate("StartScreen")}}>
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
        <BoxWordItem array={arrayMnemonic}/>
      </View>

      <View style={style.footer}>
        <TouchableOpacity 
        onPress={() => {setChecked(!checked)}}
        style={style.checkOut}>
          <Text style={style.saveText}>I SAVED THE PHRASE</Text>
          <View style={{right: 6}}>
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
        <TouchableOpacity onPress={ () => {checked ? navigation.navigate("Login"): undefined}}>
          <View style={style.buttonNext}>
            <Text style={style.textNext}>NEXT</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  )
};


const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  },

  statusBar: {
    width:'auto',
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

  backButton:{
    padding: 10
  },

  registerTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerText:{
    fontSize: 25,
    fontWeight: 'bold',
  },
  
  footer:{
    top: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  buttonCopy: {
    width: 80,
    height:40,
    right: 16,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkOut: {
    width: 220,
    height:40,
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
    fontWeight: 'bold',
  },

  saveText: {
    left: 12,
    ontSize: 14,
    fontWeight: 'bold',
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
    height:40,
    backgroundColor: '#58FFAF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNext: {
    fontWeight:'900'
  }
});
