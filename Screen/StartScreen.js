import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';

import logo from '../assets/logo.png';
import backgroundImage from '../assets/diagram.png';
import WhiteRectangle from '../assets/WhiteRectangle.png';

export function StartScreen({ navigation }) {

  return (
    <View>
      <View style={stylesStartPage.container}>
        <Image
          source={logo}
          style={stylesStartPage.logo}
          resizeMode="contain">
        </Image>

        <Image
          source={backgroundImage}
          style={stylesStartPage.background} resizeMode="contain">
        </Image>

        <Image
          source={WhiteRectangle}
          style={stylesStartPage.whiteRectangle} resizeMode="contain">
        </Image>

        <View style={stylesStartPage.textContainer}>

          <Text style={stylesStartPage.welcomeText}>
            WELCOME{"\n"}TO CRYPTO{"\n"}WALLET</Text>

          <TouchableOpacity
            style={stylesStartPage.buttonRegister}
            onPress={() => navigation.navigate("Registration")}>
            <Text style={stylesStartPage.registerButtonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesStartPage.buttonLogin}
            onPress={() => navigation.navigate("Login")}>
            <Text style={stylesStartPage.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

        </View>
      </View>

    </View>
  );
};

const stylesStartPage = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: 'auto',
    height: '100%',
  },

  background: {
    position: 'absolute',
    width: 560,
    height: 700,
    top: 200,
    right: -100,
  },

  logo: {
    position: 'absolute',
    top: 60,
    left: 13,
    padding: 10,
    width: 160,
    height: 30,
  },

  whiteRectangle: {
    width: 400,
    height: 400,
    top: 500,
    left: 0,
    borderRadius: 100,
  },

  textContainer: {
    position: 'absolute',
    top: 180,
    left: 13,
    padding: 10,
  },

  welcomeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    // fontHeight: 700,
    lineHeight: 48,
    letterSpacing: 1,
    textAlign: 'left',
  },

  buttonRegister: {
    width: 300,
    height: 50,
    top: 340,
    left: 25,
    backgroundColor: '#58FFAF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  buttonLogin: {
    width: 300,
    height: 50,
    top: 360,
    left: 25,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  registerButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

});



