import React, { useState, useEffect } from 'react';
import InfoUser from '../function/functionGetInfoUser';
import { Formik } from 'formik';
import * as yup from 'yup';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, StatusBar, SafeAreaView, Alert } from 'react-native';

import backButton from '../assets/backButton.png';
import { SendCoin } from '../function/functionTransfer';
import { useTranslation } from 'react-i18next';
import I18n from '../translations/I18n.js';
const infoUserInstance = new InfoUser();

const circumcisionUsd = (sum) => {
  return Math.trunc(sum * 1e2) / 1e2
};

const circumcisionAmount = (sum) => {
  return Math.trunc(sum * 1e5) / 1e5
};


export function SendCoinScreen({ route, navigation }) {
  const { coin, object, symbol, selectCurrency } = route.params;
  const [userToken, setUserToken] = useState([]);
  const [userWallet, setUserWallet] = useState([]);
  const [userBalance, setUserBalance] = useState([]);
  const [priceInCurr, setPriceInCurr] = useState([]);
  const [coinCommission, setCoinComission] = useState();
  const [transferComission, setTransferComission] = useState([]);
  const [amountSend, setAmountSend] = useState(0);
  const [unixTimestamp, setUnixTimestamp] = useState([]);
  const [networkCoin, setNetworkCoin] = useState([]);
  const [minimalTransferAmount, setMinTransferAmount] = useState([]);
  const translation = useTranslation().t;


  const validationSchema = yup.object().shape({
    address: yup.string()
      .required(`${translation('requiredField')}`)
      .notOneOf([userWallet], `${translation('walletValidation')}`),
    amount: yup.number()
      .required(`${translation('requiredField')}`)
      .min(minimalTransferAmount, `${translation('minimumTransferErr')}`)
      .max(userBalance - transferComission, `${translation('insufficientFundsOnBalance')}`)
  });

  const showMyAlert = (text) => {
    Alert.alert(
      'Error!',
      `${text}`, //Текст сообщения
      [
        {
          text: translation('continueButton'), // Текст кнопки
        },
      ]
    );
  };

  useEffect(() => {
    async function updateUserToken() {
      const updateUserToken = await infoUserInstance.getUserToken();
      setUserToken(updateUserToken);
    }

    const intervalId = setInterval(updateUserToken, 20000);

    updateUserToken();

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const unixTimestamp = () => {
      const currentDate = new Date();
      setUnixTimestamp(Math.floor(currentDate.getTime() / 1000));
    };

    const intervalId = setInterval(unixTimestamp, 60000);

    unixTimestamp();

    return () => clearInterval(intervalId);
  }, [])

  useEffect(() => {
    async function coinBalance() {
      const coinBalance = await infoUserInstance.getBalanceUser(coin);
      setUserBalance(coinBalance[0].amount);
      setTransferComission(coinBalance[0].amountCommission);
      setCoinComission(coinBalance[0].coinComission);
      setNetworkCoin(coinBalance[0].network);
      setMinTransferAmount(coinBalance[0].minimumWithdrawalAmount);
    }

    coinBalance();

    async function getUserWallet() {
      const userWallet = await infoUserInstance.getUserWallet(userToken);
      if (coin === 'tron' || coin === 'usdt') {
        setUserWallet(userWallet.trc.address);
      } else {
        setUserWallet(userWallet[coin].address);
      }
    }

    getUserWallet();
  }, [userToken]);

  useEffect(() => {
    const getPrice = async () => {
      const coinBalance = await infoUserInstance.getBalanceUser(coin);
      setPriceInCurr(coinBalance[0].priceInCurrency[selectCurrency])
    }

    getPrice();

  }, [selectCurrency])

  const handleSubmit = async (values) => {
    try {
      const transferAmount = values.amount;
      const transferAddress = values.address;
      console.log('parametrs send:', coin, transferAmount, userToken, transferAddress, unixTimestamp);

      const request = await SendCoin(coin, transferAmount, userToken, transferAddress, unixTimestamp);
      console.log(request);
      if (request && request.status === 'OK') {
        const hash = request.data.hash;
        navigation.navigate("SuccessfulTransactionScreen", { hash, transferAmount, transferAddress, coin, transferComission, coinCommission });
      } else {
        showMyAlert(request.error.message);
        console.log('status error');
      }
    } catch (error) {
      showMyAlert(error);
      console.error(error);
    }
  };

  const getMaxAmountSend = () => {
    if (userBalance <= (transferComission)) {
      return 0
    } else {
      return userBalance - transferComission
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ backgroundColor: 'black' }}>
        <View style={style.container}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />

          <View style={style.header}>
            <View style={style.backButton}>
              <TouchableOpacity onPress={() => { navigation.navigate("MainScreen") }}>
                <Image
                  source={backButton}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={style.headerText}>
              <Text style={{ fontSize: 18, fontWeight: '900' }}>{translation('headSend')} {coin.toUpperCase()}</Text>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={style.amountContainer}>
              <View style={style.topContent}>
                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 20, fontWeight: '900' }}>{circumcisionAmount(userBalance)} {coin.toUpperCase()}</Text>
                </View>

                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 20, fontWeight: '900' }}>{circumcisionUsd(object[selectCurrency])}{symbol}</Text>
                </View>
              </View>

              <View style={style.topContent}>
                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 19, fontWeight: '900' }}>{translation('price')}: {circumcisionUsd((priceInCurr * amountSend))}{symbol}</Text>
                </View>
              </View>

              <View style={style.topContent}>
                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 19, fontWeight: '900' }}>{translation('commisionTransfer')}: {circumcisionAmount(transferComission)} {coin.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={style.inputContain}>
            <Formik
              initialValues={{ address: '', amount: `` }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={{ height: 'auto', width: '100%' }}>
                  <View style={{ alignItems: 'center' }}>
                    <TextInput
                      onChangeText={(text) => {
                        const cleanedText = text.trim();
                        handleChange('address')(cleanedText)
                      }}
                      onBlur={handleBlur('address')}
                      value={values.address}
                      placeholder={translation('walletAddress')}
                      placeholderTextColor='#858383'
                      style={style.walletInput}
                    />
                    {touched.address && errors.address && <Text style={{ color: 'red', fontWeight: '700', marginTop: 5 }}>{errors.address}</Text>}
                  </View>

                  <View style={style.amountInputContainer}>
                    <View style={{ height: '100%', width: '100%', alignItems: 'center' }}>
                      <TextInput
                        style={style.amountInput}
                        onBlur={handleBlur('amount')}
                        value={values.amount}
                        placeholder={translation('amountSend')}
                        placeholderTextColor='#858383'
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          let cleanedNumber = text.replace(',', '.');
                          if (cleanedNumber.charAt(0) === '.') {
                            cleanedNumber = '0' + cleanedNumber;
                          };
                          const cleanedText = cleanedNumber.replace(/[^0-9.]/g, '');
                          // Перевірка на кількість крапок (можливо, ви хочете обмежити тільки одну крапку)
                          if (cleanedText.split('.').length <= 2) {
                            setAmountSend(cleanedText);
                            handleChange('amount')(cleanedText);
                          }
                        }}
                      />
                      {touched.amount && errors.amount && <Text style={{ color: 'red', fontWeight: '700', marginTop: 5 }}>{errors.amount}</Text>}

                    </View>
                    <View style={style.buttMaxContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          const maxAmount = getMaxAmountSend()
                          setAmountSend(maxAmount)
                          handleChange('amount')(maxAmount.toString());
                        }}>
                        <Text style={{ fontWeight: '800', color: 'white', fontSize: 16 }}>MAX</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ height: 120, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={style.sendCoinButton}
                      onPress={handleSubmit}>
                      <Text style={{ fontSize: 17, fontWeight: '900' }}>{translation('sendCoin')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>

          <View style={style.infoRectangle}>
            <View style={style.blackRectangle}>
              <View style={{ paddingLeft: 10 }}>
                <Text style={style.infoTextStyle}>{translation('network')}:   {networkCoin}</Text>
              </View>

              <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                <Text style={style.infoTextStyle}>{translation('minimalTransferAmount')}:  {minimalTransferAmount} {coin.toUpperCase()}</Text>
              </View>
            </View>
          </View>

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: 'auto',
    flexDirection: 'column'
  },

  statusBar: {
    width: 'auto',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },

  header: {
    height: 70,
    width: 'auto',
    flexDirection: 'row',
  },

  backButton: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerText: {
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    paddingLeft: 60
  },

  amountContainer: {
    height: 150,
    width: '95%',
    borderWidth: 2,
    borderRadius: 10,
  },

  topContent: {
    height: '33%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  inputContain: {
    marginTop: 35,
    height: '35%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  walletInput: {
    height: 40,
    width: "93%",
    color: 'white',
    borderRadius: 10,
    backgroundColor: 'black',
    padding: 10,
    paddingTop: 10,
  },

  amountInput: {
    height: 40,
    width: "93%",
    color: 'white',
    borderRadius: 10,
    backgroundColor: 'black',
    paddingLeft: 10,
  },

  sendCoinContainer: {
    height: '45%',
    width: '100%',
    justifyContent: 'flex-end',
  },

  sendCoinButton: {
    height: 60,
    width: 180,
    borderRadius: 15,
    backgroundColor: '#58FFAF',
    justifyContent: 'center',
    alignItems: 'center'
  },

  footerRectangle: {
    height: 170,
    width: '100%',
    backgroundColor: 'black',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  infoRectangle: {
    height: '25%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  blackRectangle: {
    height: 90,
    width: '95%',
    borderRadius: 15,
    backgroundColor: 'black',
    justifyContent: 'center'
  },

  infoTextStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 17
  },

  buttMaxContainer: {
    height: 40,
    width: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: '5%'

  },

  amountInputContainer: {
    height: 40,
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
    position: 'relative'
  }

});