import axios from 'axios';
import base64 from 'react-native-base64';

class RegisterFunction {
  async decryptString(encryptedText, key) {
    // const decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    return encryptedText;
  };

  async fetchMnemonic() {
    try {
      const mnemonic = (await axios.post('https://inline.dev.na4u.ru/v1/auth/registration')).data.data.mnemonic;
      console.log(mnemonic);
      return mnemonic.split(' ');
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  async loginUser(mnemonic) {
    try {
      const encodedMnemonic = base64.encode(`${mnemonic}`);
      const response = await axios.get(`https://inline.dev.na4u.ru/v1/auth/login?mnemonic=${encodedMnemonic}`);
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
        error: undefined
      };
    }
  }

};


export default new RegisterFunction();