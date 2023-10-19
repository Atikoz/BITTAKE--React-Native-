import axios from 'axios';
import functionReg from '../function/functionReg';
import LocalData from '../function/funcionLocalData.js';
import config from '../config.js';

class InfoUser {
  async GetinfoUser(token) {
    let data = {
      method: 'get',
      url: `${config.apiUrl}/v1/balance/balance`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    return axios.request(data)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === 'OK') {
          return response.data.data
        } else {
          return []
        }
      })
      .catch((error) => {
        return console.log(error);
      });
  };

  async UpdateInfoUser() {
    const userMnemonic = await LocalData.getUserData('userMnemonic');
    const userToken = (await functionReg.loginUser(userMnemonic)).token;
    const userTransactions = await this.getTransactionUser(userToken);
    const coinBalance = await this.GetinfoUser(userToken);

    // console.log('______________');
    // console.log(coinBalance);
    // console.log('______________');
    // console.log(userMnemonic);
    // console.log('______________');
    // console.log(userToken);

    return {
      coinBalance: coinBalance,
      userTransactions: userTransactions
    }
  };

  async getUserToken() {
    const userMnemonic = await LocalData.getUserData('userMnemonic');
    const userToken = (await functionReg.loginUser(userMnemonic)).token;
    return userToken
  }

  async getUserWallet() {
    const userToken = await this.getUserToken();
    let data = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${config.apiUrl}/v1/wallet/walletAddresses`,
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    };

    return axios.request(data)
      .then((response) => {
        return response.data.data
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async getBalanceUser(coin) {
    const allCoinBalance = (await this.UpdateInfoUser()).coinBalance
    if (allCoinBalance.length === 0) return []
    const balanceObj = allCoinBalance.filter(item => item.coin === coin);
    return balanceObj
  };

  async getTransactionUser(token) {

    let data = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${config.apiUrl}/v1/transaction/find`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    return axios.request(data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export default InfoUser;
