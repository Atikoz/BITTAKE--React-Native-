import React from 'react';
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

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
      <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="WalletCoinMenuScreen" component={WalletCoinMenuScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SendCoinScreen" component={SendCoinScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SuccessfulTransactionScreen" component={SuccessfulTransactionScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
};
