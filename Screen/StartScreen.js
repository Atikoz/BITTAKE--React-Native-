import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Platform, Animated } from 'react-native';

import logo from '../assets/logo.png';
import backgroundImage from '../assets/diagram.png';
import WhiteRectangle from '../assets/WhiteRectangle.png';
import funcionLocalData from '../function/funcionLocalData';
import RegisterFunction from '../function/functionReg.js';
const loginUser = RegisterFunction.loginUser;
const getUserData = funcionLocalData.getUserData;

export function StartScreen({ navigation }) {
  const [isDiagramLoaded, setIsDiagramLoaded] = useState(false);
  const [isRectangleLoaded, setIsRectangleLoaded] = useState(false);
  const [userIsAuthorized, setUserIsAuthorized] = useState(false);
  const [mnemonic, setMnemonic] = useState([]);


  const OS = Platform.OS;
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

  useEffect( () => {
    if (isDiagramLoaded) {
      Animated.timing(translateDiagram, {
        toValue: 0, // Конечное значение translateY
        duration: 1000, // Длительность анимации в миллисекундах
        useNativeDriver: true, // Использовать анимацию на уровне нативного потока
      }).start();
    } else {
      return
    }
    
  }, [isDiagramLoaded])

  useEffect( () => {
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

  // useEffect( async () => {
  //   async function checkLocalStorage() {
  //     const userFind = await getUserData('userMnemonic');
  //     console.log(userFind);
  //     if (userFind === 'user not found') {
  //       return
  //     } else {
  //       setMnemonic(userFind.trim());
  //     }
  //   }

  //   checkLocalStorage();
  // }, []);

  // useEffect( async () => {
  //   async function checkLogin() {
  //     const loginSatus = await loginUser(mnemonic);
  //     console.log(mnemonic);

  //     if (loginSatus.status === 'OK') {
  //       setUserIsAuthorized(true);
  //     } else {
  //       return
  //     }
  //   };

  //   checkLogin()

  // }, [mnemonic])


  return (

    <View>
      {!userIsAuthorized && (<View style={style.container}>
      { OS === 'ios' ? ( <View style={style.statusBar} /> ) : undefined }
  
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
                    <Text style={style.registerButtonText}>CREATE ACCOUNT</Text>
                  </TouchableOpacity>
  
                  <TouchableOpacity
                    style={style.buttonLogin}
                    onPress={() => navigation.navigate("Login")}>
                    <Text style={style.loginButtonText}>LOGIN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>
  
          <View style={style.textContainer}>
            <Animated.View style={{ transform: [{ translateX: translateText }] }}>
                <Text style={style.welcomeText}>WELCOME{"\n"}TO CRYPTO{"\n"}WALLET</Text>
            </Animated.View>
          </View>
        </View>
      </View> )}

      {userIsAuthorized && console.log(mnemonic) && navigation.navigate("MainScreen")}
    </View>

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
    width:'auto',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    width:'auto',
    height: 65,
    paddingLeft: 14,
    justifyContent: 'center'
  },

  voidContainer: {
    height: 100,
    width: 'auto',
  }

});



