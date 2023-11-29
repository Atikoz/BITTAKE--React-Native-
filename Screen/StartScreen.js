import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Animated, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';

import logo from '../assets/logo.png';
import backgroundImage from '../assets/diagram.png';
import WhiteRectangle from '../assets/WhiteRectangle.png';

import { useTranslation } from 'react-i18next';
import I18n from '../translations/I18n.js';


export function StartScreen({ navigation }) {
  const [isDiagramLoaded, setIsDiagramLoaded] = useState(false);
  const [isRectangleLoaded, setIsRectangleLoaded] = useState(false);

  const translateLogo = useRef(new Animated.Value(-200)).current;
  const translateDiagram = useRef(new Animated.Value(500)).current;
  const translateRectangle = useRef(new Animated.Value(300)).current;
  const translateText = useRef(new Animated.Value(-200)).current;

  const handleDiagramLoad = () => {
    setIsDiagramLoaded(true);
  };

  const handleRectangleLoad = () => {
    setIsRectangleLoaded(true);
  };

  useEffect(() => {
    if (isDiagramLoaded) {
      Animated.timing(translateDiagram, {
        toValue: 0, // Конечное значение translateY
        duration: 800, // Длительность анимации в миллисекундах
        useNativeDriver: true, // Использовать анимацию на уровне нативного потока
      }).start();
    } else {
      return
    }
  }, [isDiagramLoaded])

  useEffect(() => {
    if (isRectangleLoaded) {
      Animated.timing(translateRectangle, {
        toValue: 0, // Конечное значение translateY
        duration: 1500, // Длительность анимации в миллисекундах
        useNativeDriver: true, // Использовать анимацию на уровне нативного потока
      }).start();
    } else {
      return
    }
  }, [isRectangleLoaded])

  useEffect(() => {
    // Анимация при монтировании компонента
    Animated.timing(translateLogo, {
      toValue: 0, // Конечное значение translateY
      duration: 1000, // Длительность анимации в миллисекундах
      useNativeDriver: true, // Использовать анимацию на уровне нативного потока
    }).start();

    Animated.timing(translateText, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();


  }, []);

  const translation = useTranslation().t;
  return (
    <SafeAreaView style={{ backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={style.container}>

        <View style={style.logoContainer}>
          <Animated.View style={{ transform: [{ translateY: translateLogo }] }}>
            <Image
              source={logo}
              style={style.logo}
              resizeMode="contain">
            </Image>
          </Animated.View>
        </View>

        <View style={style.voidContainer} />

        <View style={style.diagramContainer}>
          <Animated.View style={{ transform: [{ translateY: translateDiagram }] }}>
            <Image
              source={backgroundImage}
              style={style.diagram}
              resizeMode="contain"
              onLoad={handleDiagramLoad}>
            </Image>
          </Animated.View>

          <View style={{ position: 'absolute' }}>
            <Animated.View style={{ transform: [{ translateY: translateRectangle }] }}>
              <View>
                <Image
                  source={WhiteRectangle}
                  style={style.whiteRectangle}
                  resizeMode="contain"
                  onLoad={handleRectangleLoad}>
                </Image>

                <View>
                  <TouchableOpacity
                    style={style.buttonRegister}
                    onPress={() => navigation.navigate("Registration")}>
                    <Text style={style.registerButtonText}>{translation('createAccount')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={style.buttonLogin}
                    onPress={() => navigation.navigate("Login")}>
                    <Text style={style.loginButtonText}>{translation('login')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>

          <View style={style.textContainer}>
            <Animated.View style={{ transform: [{ translateX: translateText }] }}>
              <Text style={style.welcomeText}>{translation('welcomText')}</Text>
            </Animated.View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: 'auto',
    height: '100%',
  },

  diagram: {
    width: 560,
    height: 700,
    right: 130
  },

  diagramContainer: {
    width: 560,
    height: 700,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  logo: {
    width: 160,
    height: 30,
  },

  whiteRectangle: {
    width: 500,
    height: 500,
    top: 370,
    right: 55
  },

  textContainer: {
    position: 'absolute',
    left: 10
  },

  welcomeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: 1,
    textAlign: 'left',
  },

  buttonRegister: {
    width: 300,
    height: 50,
    left: 15,
    bottom: 20,
    backgroundColor: '#58FFAF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  buttonLogin: {
    width: 300,
    height: 50,
    top: 0,
    left: 15,
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

  statusBar: {
    width: 'auto',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    width: 'auto',
    height: 65,
    paddingLeft: 14,
    justifyContent: 'center'
  },

  voidContainer: {
    height: 100,
    width: 'auto',
  }
});



