import axios from 'axios';
import base64 from 'react-native-base64';
import config from '../config.js';


class RegisterFunction {

  async fetchMnemonic() {
    try {
      const mnemonic = (await axios.post(`${config.apiUrl}/v1/auth/registration`)).data.data.mnemonic;
      console.log(mnemonic);
      return mnemonic.split(' ');
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  async loginUser(mnemonic) {
    try {
      const encodedMnemonic = base64.encode(`${mnemonic}`);
      const response = await axios.get(`${config.apiUrl}/v1/auth/login?mnemonic=${encodedMnemonic}`);
      return {
        status: response.data.status,
        token: response.data.data.token,
        error: response.data.error.message
      };
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        token: undefined,
        error: 'No Internet Connection...\nCheck your internet connection and try again.'
      };
    }
  }

};


export default new RegisterFunction();