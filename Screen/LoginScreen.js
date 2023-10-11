import React, { useState } from 'react';
import RegisterFunction from '../function/functionReg.js';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';

import backButton from '../assets/backButton.png';
import loginRectangle from '../assets/loginRectangle.png';
import LocalData from '../function/funcionLocalData.js';

export function LoginScreen ({ navigation }) {
  const [mnemonic, setMnemonic] = useState();

  const OS = Platform.OS;

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


  return(
    <View style={style.container}>
      { OS === 'ios' ? ( <View style={style.statusBar} /> ) : undefined }
      <View style={style.navBar}>
        <TouchableOpacity onPress={ () => {navigation.navigate("StartScreen")}}>
          <Image
            source={backButton}
            style={style.backButton}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={style.loginTextContainer}>
          <Text style={style.loginBarText}>Login</Text>
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
          onPress={async () => {
            const response = await RegisterFunction.loginUser(mnemonic.trim());
            if (response.status === 'OK') {
              await LocalData.saveUserData('userMnemonic', mnemonic);
              navigation.navigate("MainScreen");
            } else {
              showMyAlert(response.error);
            }
          }}>
          <Text style={style.loginText}>LOGIN</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },

  statusBar: {
    width:'auto',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },

  navBar:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    padding: 10,
  },

  backButton:{
    padding: 10
  },

  loginText:{
    fontSize: 20,
    fontWeight: 'bold',
  },

  loginBarText:{
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
});