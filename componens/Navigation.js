import React, { useState, useEffect } from 'react';
import { StartScreen } from '../Screen/StartScreen.js'
import { LoginScreen } from '../Screen/LoginScreen.js';
import { MainScreen } from '../Screen/MainScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { RegistrationScreen } from '../Screen/RegistrationScreen.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WalletCoinMenuScreen } from '../Screen/WalletCoinMenu.js';
import { SendCoinScreen } from '../Screen/SendCoinScreen.js';
import { SuccessfulTransactionScreen } from '../Screen/SuccessfulTransactionScreen.js';
import { SettingsScreen } from '../Screen/SettingsScreen.js';

import funcionLocalData from '../function/funcionLocalData';
import RegisterFunction from '../function/functionReg.js';
import Loader from './Loader.js';
const loginUser = RegisterFunction.loginUser;
const getUserData = funcionLocalData.getUserData;

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const [userIsAuthorized, setUserIsAuthorized] = useState(null);

  useEffect(() => {
    const checkLocalStorage = async () => {
      const userMnemonic = await getUserData('userMnemonic');

      if (userMnemonic === 'user not found') {
        return setUserIsAuthorized(false);
      } else {
        const loginSatus = await loginUser(userMnemonic.trim());

        if (loginSatus.status === 'OK') {
          setUserIsAuthorized(true);
          console.log('request login succes');
        } else {
          setUserIsAuthorized(false);
          console.log('request login error');
        }
      }
    };

    checkLocalStorage();

  }, []);

  if (userIsAuthorized === null) {
    return (
      <Loader />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userIsAuthorized ? 'MainScreen' : 'StartScreen'}>
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WalletCoinMenuScreen" component={WalletCoinMenuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SendCoinScreen" component={SendCoinScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SuccessfulTransactionScreen" component={SuccessfulTransactionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
